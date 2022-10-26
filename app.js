const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});*/

mongoose.connect('mongodb://localhost:27017/mestodb',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB')
  });

app.use((req, res, next) => {
  req.user = {
    _id: '6359729933cf172d19b0a7be'
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.listen(PORT, () => {
  console.log(`App listen to ${PORT} port`);
});

