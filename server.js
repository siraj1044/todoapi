
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/todo', (req, res, next) => {
  res.send('todo get');
});

app.post('/todo', (req, res, next) => {
  res.send('todo post');
});

app.put('/todo', (req, res, next) => {
  res.send('todo put');
});

app.delete('/:id', (req, res, next) => {
  res.send('todo delete');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});