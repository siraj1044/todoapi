const UserModel = require('../user/user.model');

/**
 * @author Ahsan Ayaz, Siraj ul Haq
 * @description middleware to check for token in header
 * and validate user against the provided token
 */
const Auth = (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers['X-ACCESS-TOKEN'];

    if (!token) {
        return res.status(401).json({
          message: "Your Session has Expired, please LogIn."
        });
    } else {
        /** get user by token */
        UserModel.findOne({token: token}, (err, user) => {
          if (user) {
            req.user = user;
            next();
          } else {
              res.status(403).json({
                message: "Your Session has Expired, please LogIn."
              });
          }
        });
    }
};

module.exports = Auth;