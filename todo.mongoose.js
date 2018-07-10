
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapp');
const seedData = require('./todo.seed');

/**Connect to mongodb - using mongoose */
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connect successfully');
});

/** Todo model schema */
let todoSchema = new mongoose.Schema({
  name: String,
  description: String
});

let Todo = mongoose.model('todo', todoSchema);

/** find todo item by id */
findById = (id) => {
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(todo);
    }
  });
};

/** find all todo items that matches search criteria */
findAll = (params) => {
  Todo.find(params, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      console.log(todos);
    }
  });
};

/** Insert new todo item in to collection */
create = (modelInfo) => {
  let todoItem = new Todo(modelInfo);
  todoItem.save();
  console.log(`Item created - ${todoItem.name}`);
};

/** Update existing item info */
update = (modelInfo, data) => {
  Todo.findOneAndUpdate({_id: modelInfo.id}, data,
    {new: true},
    (err, todo) => {
      if (err) {
        console.log(err);
      } else {
        console.log(todo);
      }
  });
};

/** delete todo item by id */
deleteTodo = (id) => {
  Todo.findOneAndRemove({_id: id}, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(todo);
    }
  });
};

/**
 * find all item created
 */
findAll();


/**
 * Iterate on todo items and insert it into collection
 */
seedData.forEach((todoItem) => {
  create(todoItem);
});
