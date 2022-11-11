const jwt = require('jsonwebtoken');
// const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { authorization } = req.headers;
  if (!token) {
    throw new AuthError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
  }
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret', { expiresIn: '7d' });
  } catch (err) {
    throw new AuthError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
  }
  req.user = payload;
  next();
};
