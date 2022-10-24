const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ name: user.name, about: user.about, avatar: user.avatar, _id: user._id }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.editUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name: user.name, about: user.about })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar: user.avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = usersRouter;



//GET /users — возвращает всех пользователей из базы;
//GET /users/:userId — возвращает пользователя по _id ;
//POST /users — создаёт пользователя с переданными в теле запроса name , about и avatar ;
//PATCH /users/me — обновляет профиль пользователя;
//PATCH /users/me/avatar — обновляет аватар пользователя;
//GET /cards — возвращает все карточки из базы;
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

//Реализуйте ещё четыре роута:
//PATCH /users/me — обновляет профиль
//PATCH /users/me/avatar — обновляет аватар

//PUT /cards/:cardId/likes — поставить лайк карточке
//DELETE /cards/:cardId/likes — убрать лайк с карточки