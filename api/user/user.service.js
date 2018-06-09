// User service
const User = require('./user.model');
const uuidv1 = require('uuid/v1');

let UserService = {
  
  signup: (newUser, callback) => {
    let user = new User(newUser);
    user.save((err, savedUser) => {
      callback(err, savedUser);
    });
  },

  login: (userInfo, callback) => {
    User.findOne({email: userInfo.email}, (err, user) => {
      if (user) {
        let match = user.comparePassword(userInfo.password);
        if (match) {
          /** Generate Unique token */
          let uuid = uuidv1();
          User.findByIdAndUpdate(user._id, {token: uuid}, {new: true}, 
            (err, updatedUser) => {
              callback(err, updatedUser);
            });
        } else {
          callback(new Error('Invalid Password'));
        }
      } else {
        callback(new Error('Invalid Email address.'))
      }
    });
  },

  updateUser: (id, data, callback) => {
    User.findByIdAndUpdate(id, data, {new: true}, (err, updatedUser) => {
      callback(err, updatedUser);
    })
  },

  getUserById: (id, callback) => {
    User.findById(id, (err, user) => {
      callback(err, user);
    })
  },

  getUsers: (userId, callback) => {
    User.find({createdBy: userId}, (err, users) => {
      callback(err, users);
    })
  },

  deleteUser: (id, callback) => {
    User.deleteOne({_id: id}, callback);
  }
};

module.exports = UserService;