/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': { view: 'pages/homepage' },

  // User/ signup refers to an action target:
  // User in this context represents the UserController.
  // signup refers to the signup action(a function) defined within the UserController.
  // 'POST /api/signup': { action: 'User/signup'},
  // 'POST /api/signin': { action: 'User/signin'},
  // 'GET /api/users': { action: 'User/getAllUser' },

  'POST /api/signup': 'AuthController.signup',
  'POST /api/signin': 'AuthController.signin',
  'GET /api/users': 'UserController.getAllUser',
  'GET /api/users/:id': 'UserController.getUser',
  'PUT /api/users/:id': 'UserController.updateUser',
  'DELETE /api/users/:id': 'UserController.deleteUser',



  //This is an older, classic syntax that directly maps the route to a specific action in a specific controller. Controller and Action Notation: Here, UserController refers to the file name (UserController.js), and signup is the name of the function within that controller. This syntax tells Sails to look specifically for the signup action within the UserController.

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
