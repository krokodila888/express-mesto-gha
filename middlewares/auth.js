const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {

  console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
console.log(token);

if (!token) {
  throw new AuthError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
}

let payload;
console.log(jwt.verify(token, 'super-strong-secret', { expiresIn: '7d' }));

try {
  payload = jwt.verify(token, 'super-strong-secret', { expiresIn: '7d' });
  console.log(payload);

} catch (err) {
  throw new NotFoundError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
}
req.user = payload;

next();
};