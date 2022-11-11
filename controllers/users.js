const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
// const AuthError = require('../errors/AuthError');
const DoubleEmailError = require('../errors/DoubleEmailError');

const User = require('../models/user');
const {
  ERROR_MESSAGE, RES_OK_CODE
} = require('../utils/utils');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.USER_GET_ID));
      }
      // оставила тут эту проверку, потому что автотесты требуют в этом месте проверку на ошибку 400
      if (err.message === 'NotFound') {
        next(new NotFoundError(ERROR_MESSAGE.USER_GET_ID));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id || req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => next(err));
};

exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      });
    })
    .then((user) => res.status(RES_OK_CODE).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_POST));
      }
      if (err.code === 11000) {
        next(new DoubleEmailError('Такой email уже существует.'));
      } else {
        next(err);
      }
    });
};

module.exports.editUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ERROR_MESSAGE.USER_GET_ID));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ERROR_MESSAGE.USER_GET_ID));
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.PATCH_AV_INV_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ message: `${token}, ${user}` });
    })
    .catch(next);
};
