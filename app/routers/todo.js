const todoRouter = require('express').Router();
const _ = require('lodash');

let todos = [];
let id = 0;
/** increment id and attach it to request object */
updateId = () => {
  return (req, res, next) => {
    id++;
    req.body.id = id + '';
    next();
  }
}

/** get id param
 * find matching todo and attach it to request object
 */
todoRouter.param('id', (req, res, next, todoId) => {
  let todo = _.find(todos, { id: todoId });
  let todoIndex = _.findIndex(todos, { id: todoId });
  if(todo){
    req.todo = todo;
    req.todoIndex = todoIndex;
    next();
  } else {
    res.status(400).json({});
  }
})

todoRouter.get('/', (req, res) => {
  res.json(todos);
});

todoRouter.get('/:id', (req, res) => {
  res.json(req.todo || {});
});

todoRouter.post('/', updateId(), (req, res) => {
  let todo = req.body;
  todos.push(todo);
  res.json(todo);
});

todoRouter.put('/:id', (req, res) => {
  let update = req.body;
  if(!todos[req.todoIndex]) {
    res.json({});
  } else {
    /** assign will extend current todo item with posted update
     *  assign extend from right to left 
     * */
    let updatedTodo = _.assign(todos[req.todoIndex], update);
    res.json(updatedTodo);
  }
});

todoRouter.delete('/:id', (req, res) => {
  if (!todos[req.todoIndex]) {
    res.json({});
  } else {
    let todo = todos[req.todoIndex];
    todos.splice(req.todoIndex, 1);
    res.json(req.todo);
  }
});

module.exports = todoRouter;