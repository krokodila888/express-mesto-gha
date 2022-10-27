const Card = require('../models/card');
const { ERROR_CODE_WRONG_DATA, ERROR_CODE_NOT_FOUND, ERROR_CODE_SOMETHING_IS_WRONG, ERROR_MESSAGE } = require('../utils/utils.js');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(cards => res.send({ data: cards }))
    .catch((err) => {
      if (res.status(ERROR_CODE_WRONG_DATA)) {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_POST_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if(err.message === 'NotFound') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_DELETE_ID_NOT_FOUND_ERROR });
      }
      if (res.status(ERROR_CODE_WRONG_DATA)) {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_DELETE_ID_NOT_FOUND_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if(err.message === 'NotFound') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_PUT_LIKE_ID_NOT_FOUND_ERROR });
      }
      if (res.status(ERROR_CODE_WRONG_DATA)) {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_PUT_LIKE_INVALID_DATA_ERROR });
      }
      if (res.status(ERROR_CODE_NOT_FOUND)) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.CARD_PUT_LIKE_ID_NOT_FOUND_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });

module.exports.deleteLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if(err.message === 'NotFound') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_DELETE_LIKE_ID_NOT_FOUND_ERROR });
      }
      if (res.status(ERROR_CODE_WRONG_DATA)) {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.CARD_DELETE_LIKE_INVALID_DATA_ERROR });
      }
      if (res.status(ERROR_CODE_NOT_FOUND)) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.CARD_DELETE_LIKE_ID_NOT_FOUND_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });