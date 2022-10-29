const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const { ERROR_CODE_NOT_FOUND, ERROR_MESSAGE } = require('./utils/utils');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  (err) => {
    if (err) throw err;
    //  console.log('connected to MongoDB');
  },
);

app.use((req, res, next) => {
  req.user = {
    _id: '6359701ab47257d0c732800d',
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);
app.use('*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE.SOMETHING_WRONG });
});

app.listen(PORT, () => {
//  console.log(`App listen to ${PORT} port`);
});
