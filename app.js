const http = require('http');
const server = http.createServer();
//const path = require('path');
const express = require('express');
const mestodb = require('mongoose');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mestodb.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

/*app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
//мидлвэр добавляет в каждый запрос объект user. Берите из него идентификатор пользователя в контроллере создания карточки:
*/

app.use(usersRouter);
app.use(cardsRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});

app.listen(PORT, () => {
  console.log(`App listen to ${PORT} port`);
});

