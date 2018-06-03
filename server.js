
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let todos = [];
let id = 0;

app.get('/todo', (req, res) => {
  res.json(todos);
});

app.get('/todo/:id', (req, res) => {
  let todo = _.find(todos, { id: req.params.id });
  res.json(todo || {});
});

app.post('/todo', (req, res) => {
  let todo = req.body;
  id++;
  todo.id = id + '';
  todos.push(todo);
  res.json(todo);
});

app.put('/todo/:id', (req, res) => {
  let update = req.body;
  let todoIndex = _.findIndex(todos, { id: req.params.id });
  if(!todos[todoIndex]) {
    res.json({});
  } else {
    /** assign will extend current todo item with posted update
     *  assign extend from right to left 
     * */
    let updatedTodo = _.assign(todos[todoIndex], update);
    res.json(updatedTodo);
  }
});

app.delete('/todo/:id', (req, res) => {
  let todoIndex = _.findIndex(todos, { id: req.params.id });
  if (!todos[todoIndex]) {
    res.json({});
  } else {
    let todo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    res.json(todo);
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});