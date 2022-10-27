const User = require('../models/user');
const { ERROR_CODE_WRONG_DATA, ERROR_CODE_NOT_FOUND, ERROR_CODE_SOMETHING_IS_WRONG, ERROR_MESSAGE } = require('../utils/utils.js');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG }));
};

/*module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .orFail((err) => {return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR })})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if(err.message === 'NotFound') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR });
      }
      if (res.status(ERROR_CODE_NOT_FOUND)) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });
};*/

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR })})
    .then((user) => {if (!user) {return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR })}
      res.send({ data: user })})
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR });
      }
      if (res.status(ERROR_CODE_NOT_FOUND)) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_POST_ERROR });
      }
    return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG })})
};

module.exports.editUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {if (!user) {return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR })} res.send({ data: user })})
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_PATCH_PROFILE_INVALID_DATA_ERROR });
      }
      if (res.status(ERROR_CODE_WRONG_DATA)) {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_PATCH_PROFILE_INVALID_DATA_ERROR });
      }
      if (res.status(ERROR_CODE_NOT_FOUND)) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_PATCH_ID_NOT_FOUND_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {if (!user) {return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_GET_ID_ERROR })} res.send({ data: user })})
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_PATCH_AVATAR_INVALID_DATA_ERROR });
      }
      if (res.status(ERROR_CODE_WRONG_DATA)) {
        return res.status(ERROR_CODE_WRONG_DATA).send({ message: ERROR_MESSAGE.USER_PATCH_AVATAR_INVALID_DATA_ERROR });
      }
      if (res.status(ERROR_CODE_NOT_FOUND)) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.USER_PATCH_ID_NOT_FOUND_ERROR });
      }
      return res.status(ERROR_CODE_SOMETHING_IS_WRONG).send({ message: ERROR_MESSAGE.SOMETHING_IS_WRONG });
    });
};