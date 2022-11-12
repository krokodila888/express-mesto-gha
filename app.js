const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// const AuthError = require('./errors/AuthError');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  (err) => {
    if (err) throw err;
    // console.log('connected to MongoDB');
  },
);

const auth = require('./middlewares/auth');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg|bmp))/),
  }),
}), createUser);

app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);
app.use('*', () => {
  throw new NotFoundError('Вы сделали что-то не то. Вернитесь назад.');
});

app.use(errors());
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(500).send({ message: 'На сервере произошла ошибка.' });
  next();
});

app.listen(PORT, () => {
  // console.log(`App listen to ${PORT} port`);
});
