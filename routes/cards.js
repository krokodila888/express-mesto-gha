const cardsRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(www\.)?([A-Za-z\d-])+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]#?$/),
  }),
}), createCard);

cardsRouter.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), deleteCard);

cardsRouter.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), likeCard);

cardsRouter.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), deleteLike);

module.exports = cardsRouter;