const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapp');

let db = mongoose.connection;

/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc When there's an error connecting to database, this handler will trigger
 */
db.on('error', (err) => {
  console.error('connection error:', err);
});

/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc When connection is properly established with the MongoDB, this handler
 * will trigger.
 */
db.once('open', () => {
  console.log('db connection established successfully');
});

module.exports = db;
