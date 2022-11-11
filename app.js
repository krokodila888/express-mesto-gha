const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const AuthError = require('./errors/AuthError');


const { ERROR_CODE_NOT_FOUND } = require('./utils/utils');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(errors());

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  (err) => {
    if (err) throw err;
    console.log('connected to MongoDB');
  },
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?([A-Za-z\d-])+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), createUser);

app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);
app.use('*', (req, res) => {
  if (res.status(ERROR_CODE_NOT_FOUND)) {
    throw new AuthError('Необходимо авторизироваться');
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'На сервере произошла ошибка' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listen to ${PORT} port`);
});
