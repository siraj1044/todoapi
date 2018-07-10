const userRouter = require('express').Router();
const userService = require('./user.service');
const { check, validationResult } = require('express-validator/check');
const Auth = require('../utility/auth');

/**
 * @author Ahsan Ayaz, Siraj ul haq
 * @description User signup route
 */
userRouter.post('/signup', [
  check('user.firstName', 'First Name is required').not().isEmpty(),
  check('user.lastName', 'Last Name is required').not().isEmpty(),
  check('user.email', 'Email is required').isEmail().custom(value => {
    //Check if email already registered
    return userService.findUserByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already regitered!');
      }
    });
  }),
  check('user.password', 'Password is Required and should have more than 4 characters.').isLength({ min: 5 }),
  check('user.confirmPassword').custom((value, { req }) => value === req.body.user.password)
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body.user;
  /**
   * Calling service method which return promise
   */
  userService.signup(user).then((user) => {
    res.json({
      user: user,
      message: "User added successfully"
    });
  }).catch((err) => {
    next({
      error: err.message
    });
  });
});

/**
 * @author Ahsan Ayaz, Siraj ul haq
 * @description User login route
 */
userRouter.post('/login', [
  check('user.email', 'Email is required').isEmail(),
  check('user.password', 'Password is Required and should have more than 4 characters.').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body.user;
  userService.login(user).then((user) => {
    res.json({
      user: user,
      message: 'Login successful'
    });
  }).catch((err) => {
    next({
      message: err.message
    });
  });
});

userRouter.get('/:id', Auth, (req, res, next) => {
  userService.getUserById(req.params.id).then((user) => {
    res.json({
      user: user,
      message: "User found with the given id"
    });
  }).catch((err) => {
    next({
      message: err.message
    });
  });
})

module.exports = userRouter;