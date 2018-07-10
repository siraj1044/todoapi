// User service
const User = require('./user.model');
const uuidv1 = require('uuid/v1');

let UserService = {
  
  findUserByEmail: (email) => {
    return User.findOne({email: email});
  },

  signup: (newUser) => {
    let user = new User(newUser);
    return user.save();
  },

  login: (userInfo) => {
    /** This function will return Promise
     * Resolve will be called if call is successfull
     * or it will call reject if there is any issue
     */
    return new Promise((resolve, reject) => {
      User.findOne({email: userInfo.email}).then((user) => {
        if (user) {
          let match = user.comparePassword(userInfo.password);
          if (match) {
            /** Generate Unique token */
            let uuid = uuidv1();
            user.token = uuid;
            user.save()
              .then((user) => {
                //Successfull call
                resolve(user);
              })
              .catch((err) => {
                //There is an error
                reject(err);
              });
          } else {
            //Password mismatch
            reject(new Error('Invalid Password'));
          }
        } else {
          //User with provided email not found
          reject(new Error('Invalid Email address.'))
        }
      }).catch((err) => {
        //DB error
        reject(err);
      });
    });
  },

  updateUser: (id, data, callback) => {
    //Mongoose by default returns promise
    return User.findByIdAndUpdate(id, data, {new: true});
  },

  getUserById: (id, callback) => {
    return User.findById(id);
  },

  getUsers: (userId, callback) => {
    return User.find({createdBy: userId});
  },

  deleteUser: (id, callback) => {
    return User.deleteOne({_id: id});
  }
};

module.exports = UserService;