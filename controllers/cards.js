const Card = require('../models/card');
const {
  ERROR_CODE_WRONG_DATA, ERROR_CODE_NOT_FOUND, ERROR_CODE_DEFAULT, ERROR_MESSAGE,
} = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_POST });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.CARD_DELETE_NO_ID });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_DEL_WRONG_ID });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.PUT_LIKE_INV_DATA });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.PUT_LIKE_INV_DATA });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_DEL_WRONG_ID });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });

module.exports.deleteLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.DELETE_LIKE_NO_ID });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.PUT_LIKE_INV_DATA });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_DEL_WRONG_ID });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });
