const usersRouter = require('express').Router();

const {
  getUsers, getUser, createUser, editUserProfile, editUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', editUserProfile);
usersRouter.patch('/users/me/avatar', editUserAvatar);

module.exports = usersRouter;
