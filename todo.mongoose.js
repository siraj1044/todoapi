
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapp');

/**Connect to mongodb - using mongoose */
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connect successfully');
});

/** Todo model schema */
let todoSchema = mongoose.Schema({
  name: String,
  description: String
});

let todo = mongoose.model('todo', todoSchema);

/** find todo item by id */
findById = (id) => {
  todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(todo);
    }
  });
};

/** find all todo items that matches search criteria */
findAll = (params) => {
  todo.find(params, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      console.log(todos);
    }
  });
};

/** Insert new todo item in to collection */
create = (modelInfo) => {
  let todoItem = new todo(modelInfo);
  todoItem.save();
  console.log(`Item created - ${todoItem.name}`);
};

/** Update existing item info */
update = (modelInfo, data) => {
  todo.findOneAndUpdate({_id: modelInfo.id}, data, 
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
  todo.findOneAndRemove({_id: id}, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      console.log(todo);
    }
  });
};

let todoItems = [{
  name: 'do something new!',
  description: 'do something new!'
}, {
  name: 'do shopping!',
  description: 'do shopping!'
}, {
  name: 'do exercise!',
  description: 'do exercise!'
}]

/**
 * Iterate on todo items and insert it into collection
 */
todoItems.forEach((todoItem) => {
  //create(todoItem);
});

/**
 * find all item created
 */
findAll();