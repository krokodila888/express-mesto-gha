const Card = require('../models/card');
const {
  ERROR_MESSAGE, RES_OK_CODE,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
// const AuthError = require('../errors/AuthError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((cards) => res.status(RES_OK_CODE).send({ cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.CARD_POST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(ERROR_MESSAGE.CARD_DELETE_NO_ID));
      }
      if (card.owner.toString() !== req.user._id) {
        next(new RequestError('Эту карточку удалить нельзя. Это чужая карточка!'));
      }
      Card.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
          throw new NotFoundError(ERROR_MESSAGE.CARD_DELETE_NO_ID);
        })
        .then(() => res.send({ data: card }))
        .catch((err) => {
          if (err.message === 'NotFound') {
            next(new NotFoundError(ERROR_MESSAGE.CARD_DELETE_NO_ID));
          }
          if (err.name === 'CastError') {
            next(new RequestError(ERROR_MESSAGE.CARD_DEL_WRONG_ID));
          } else {
            next(err);
          }
        });
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      if (res.status(RES_OK_CODE)) {
        res.send({ data: card });
      }
    })
    // res.status(RES_OK_CODE).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError(ERROR_MESSAGE.PUT_LIKE_INV_DATA));
      }
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.PUT_LIKE_INV_DATA));
      }
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.CARD_DEL_WRONG_ID));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      if (res.status(RES_OK_CODE)) {
        res.send({ data: card });
      }
    })
    // res.status(RES_OK_CODE).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError(ERROR_MESSAGE.DELETE_LIKE_NO_ID));
      }
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.PUT_LIKE_INV_DATA));
      }
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.CARD_DEL_WRONG_ID));
      } else {
        next(err);
      }
    });
};
