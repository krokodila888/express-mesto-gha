const User = require('../models/user');
const {
  ERROR_CODE_WRONG_DATA, ERROR_CODE_NOT_FOUND, ERROR_CODE_DEFAULT, ERROR_MESSAGE,
} = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_GET_ID });
      }
      // оставила тут эту проверку, потому что автотесты требуют в этом месте проверку на ошибку 400
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_POST });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });
};

module.exports.editUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({
          message: ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA,
        });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID }); return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.PATCH_AV_INV_DATA });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
    });
};
