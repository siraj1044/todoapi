
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Import todo Router
 */
let todoRouter = require('./app/routers/todo');
app.use('/todo', todoRouter);

let port = 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});