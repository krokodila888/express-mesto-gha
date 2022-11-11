const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/NotFoundError');

/*module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Проблема на стадии 1' });
  }
  const extractToken = (header) => header.replace('Bearer ', '');
  console.log(authorization);
  const token = extractToken(authorization);
  console.log(token);
  console.log(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
    console.log(payload);

  } catch (err) {
    return res
      .status(401)
      .send({ message: err });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

const jwt = require('jsonwebtoken');
const { ERROR_MESSAGE } = require('../utils/constants');
const UnauthorizedErr = require('../errors/UnauthorizedErr');*/

/*
const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};*/
module.exports = (req, res, next) => {

  console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
console.log(token);

if (!token) {
  throw new NotFoundError({message: 'ghj,ktvf 1'});
}

let payload;
console.log(jwt.verify(token, 'super-strong-secret', { expiresIn: '7d' }));

try {
  payload = jwt.verify(token, 'super-strong-secret', { expiresIn: '7d' });
  console.log(payload);

} catch (err) {
  throw new NotFoundError({message: 'ghj,ktvf 2'});
}
req.user = payload;

next();
};