const todoRouter = require('express').Router();
const todoService = require('./todo.service');

/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc POST todo route for inserting a todo to the database.
 */
todoRouter.post('/', (req, res, next) => { // endpoint '/todo', method : 'POST'
  const newTodo = req.body.todo;
  /**
   * calling service method to create and return newly created todo
   */
  todoService.createTodo(newTodo, (err, todo) => {
    if (!err) {
      res.json({
        todo: todo,
        message: "Todo added successfully"
      });
    } else {
      next(err);
    }
  });
});

/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc GET todo route - Get all todos related to specific user.
 */
todoRouter.get('/', (req, res) => { // endpoint '/todo/', method : 'GET'
  todoService.getTodos((err, todos) => {
    if (!err) {
      res.json({
        todo: todos,
        message: "All todos"
      });
    } else {
      next(err);
    }
  });
});

/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc GET todo route by id.
 */
todoRouter.get('/:id', (req, res) => { // endpoint '/todo/:id', method : 'GET'
  todoService.getTodoById(req.params.id, (err, todo) => {
    if (!err) {
      res.json({
        todo: todo,
        message: "Todo record found"
      });
    } else {
      next(err);
    }
  });
});

/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc PUT todo route - Update todo item .
 */
todoRouter.put('/:id', (req, res) => { // endpoint '/todo/:id', method : 'PUT'
  todoService.updateTodo(req.params.id, req.body, 
    (err, updatedTodo) => {
      if (!err) {
        res.json({
          todo: updatedTodo,
          message: "Todo record updated"
        });
      } else {
        next(err);
      }
    });
});

todoRouter.delete('/:id', (req, res) => { // endpoint '/todo/:id', method : 'DELETE'
  todoService.deleteTodo(req.params.id, (err, todo) => {
    if (!err) {
      res.json({
        todo: todo,
        message: "Todo Deleted!"
      });
    } else {
      next(err);
    }
  });
});

module.exports = todoRouter;

