const mongoose = require('mongoose');

/** Todo model schema */
const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: Boolean
});

// Creating the Todo model using schema here
const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
