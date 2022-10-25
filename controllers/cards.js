//Она добавляет в каждый запрос объект user. Берите из него идентификатор пользователя в контроллере создания карточки:
const CardUser = require('../models/user');

module.exports.getCards = (req, res) => {
  Card.find({})
      .then(cards => res.send({ data: cards }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
const { name, link } = req.body;
Card.create({ name, link, owner: req.user._id })
  .then(user => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
Card.findByIdAndRemove(req.params.id)
  .then(user => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//module.exports.createCard = (req, res) => {
//  console.log(req.user._id); // _id станет доступен
//};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

module.exports.deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
  )




//POST /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для
//карточки;
//DELETE /cards/:cardId — удаляет карточку по _id ;
//PUT /cards/:cardId/likes — ставит лайк карточке;
//DELETE /cards/:cardId/likes — убирает лайк с карточки

//GET /cards — возвращает все карточки
//POST /cards — создаёт карточку
//DELETE /cards/:cardId — удаляет карточку по идентификатору

//В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.
//Другие роуты карточек и пользователя