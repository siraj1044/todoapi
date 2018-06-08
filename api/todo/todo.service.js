// TODO service
const Todo = require('./todo.model');

let TodoService = {
  
  createTodo: (newTodo, callback) => {
    let todoItem = new Todo(newTodo);
    todoItem.save((err, savedTodo) => {
      callback(err, savedTodo);
    });
  },

  updateTodo: (id, data, callback) => {
    Todo.findByIdAndUpdate(id, data, {new: true}, (err, updatedTodo) => {
      callback(err, updatedTodo);
    })
  },

  getTodoById: (id, callback) => {
    Todo.findById(id, (err, todo) => {
      callback(err, todo);
    })
  },

  getTodos: (userId, callback) => {
    Todo.find({createdBy: userId}, (err, todos) => {
      callback(err, todos);
    })
  },

  deleteTodo: (id, callback) => {
    Todo.deleteOne({_id: id}, callback);
  }
};

module.exports = TodoService;