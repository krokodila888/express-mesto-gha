const cardsRouter = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, deleteLike } = require('../controllers/users');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', deleteLike);

module.exports = cardsRouter;


