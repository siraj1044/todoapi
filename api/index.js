/**
 * This is the main API file. All of the api routers are
 * initiated here.
 * The file exports a function, to which the express `app` is passed.
 * Then we do `app.use` to register routers
 */

let todoRouter = require('./todo/todo.router');
let userRouter = require('./user/user.router');
let Auth = require('./utility/auth');

/**
 * @author Ahsan Ayaz, Siraj Ul Haq
 * @desc Exported function from the file.
 * Uses the `app` passed to register routers (route middlewares)
 * @param app - the express app instance
 */
module.exports = function (app) {
  app.use('/todo', Auth, todoRouter);
  app.use('/user', userRouter);
}
