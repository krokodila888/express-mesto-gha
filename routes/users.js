const usersRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, editUserProfile, editUserAvatar, getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).required(),
  }),
}), getCurrentUser);

usersRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required(),
  }),
}), getUser);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserProfile);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/(www\.)?([A-Za-z\d-])+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]#?$/),
  }),
}), editUserAvatar);

module.exports = usersRouter;
