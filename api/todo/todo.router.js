const todoRouter = require('express').Router();
const Todo = require('./todo.model');

let todos = [];
let id = 0;
/** increment id and attach it to request object */
const assignUniqueId = (req, res, next) => {
  id++;
  req.body.todo.id = id + '';
  next();
}

// Commenting this out for ease of understanding for now.
// We could also use this middleware for ease of access as we get more experience.

// /** get id param
//  * find matching todo and attach it to request object
//  */
// todoRouter.param('id', (req, res, next, todoId) => {
//   let todo = todos.find((todoItem) => {
//     return todoItem.id === todoId;
//   });
//   let todoIndex = todos.findIndex((todoItem) => {
//     return todoItem.id === todoId;
//   });
//   if (todo) {
//     req.todo = todo;
//     req.todoIndex = todoIndex;
//     next();
//   } else {
//     res.status(400).json({
//       error: `Could not find todo based on id = ${todoId}`
//     });
//   }
// })


/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc Sample method for inserting a todo to the database.
 * DO NOT use it in the later classes, use your own functions and
 * follow the REST conventions. This `/insert` is just for explanation, don't use it.
 */
todoRouter.post('/insert', (req, res, next) => { // endpoint '/todo/insert', method : 'POST'
  const newTodo = req.body.todo;
  let todoItem = new Todo(newTodo);
  todoItem.save((err, savedTodo) => {
    if (!err) {
      res.json({
        todo: savedTodo,
        message: "Todo added successfully"
      });
    } else {
      res.json({
        error: err
      })
    }
  });
});

todoRouter.get('/', (req, res) => { // endpoint '/todo/', method : 'GET'
  res.json(todos);
});

todoRouter.get('/:id', (req, res) => { // endpoint '/todo/:id', method : 'GET'
  const todo = todos.find(todoItem => {
    return todoItem.id === req.params.id; // matching each element's id with the id we've got from params
  });
  if (todo) {
    res.json({
      todo: todo
    });
  } else {
    res.json({
      error: `Todo not found using id: ${req.params.id}`
    })
  }
});

todoRouter.post('/', assignUniqueId, (req, res) => { // endpoint '/todo/', method : 'POST'
  let todo = req.body.todo;
  todos.push(todo);
  res.json({
    todo: todo,
    message: "Todo added successfully"
  });
});

todoRouter.put('/:id', (req, res) => { // endpoint '/todo/:id', method : 'PUT'
  let update = req.body.todo;
  const todoToUpdate = todos.find(todoItem => {
    return todoItem.id === req.params.id; // matching each element's id with the id we've got from params
  });
  if (!todoToUpdate) {
    res.json({
      error: `Todo not found using id: ${req.params.id}`
    })
  } else {
    /** assign will extend current todo item with posted update
     *  assign extend from right to left
     **/
    let updatedTodo = Object.assign(todoToUpdate, update);
    res.json({
      todo: updatedTodo,
      message: "Todo updated successfully"
    });
  }
});

todoRouter.delete('/:id', (req, res) => { // endpoint '/todo/:id', method : 'DELETE'
  // find index of the todo to remove / splice
  const todoToDeleteIndex = todos.findIndex(todoItem => {
    return todoItem.id === req.params.id; // matching each element's id with the id we've got from params
  });
  if (todoToDeleteIndex === -1) { // this means the todo with provided id doesn't exist
    res.json({
      error: `Todo not found using id: ${req.params.id}`
    });
  } else {
    const deletedTodos = todos.splice(todoToDeleteIndex, 1); // splice returns array of deleted/spliced elements
    res.json({
      todo: deletedTodos[0], // sending back the deleted todo
      message: "Todo deleted successfully"
    });
  }
});

module.exports = todoRouter;

