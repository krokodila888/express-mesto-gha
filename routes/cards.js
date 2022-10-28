const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, deleteLike
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', deleteLike);

module.exports = cardsRouter;
