const usersRouter = require('express').Router();
const User = require('../models/user');

const { getUsers, getUser, createUser, editUserProfile, editUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', editUserProfile);
router.patch('/me/avatar', editUserAvatar);

module.exports = usersRouter;

