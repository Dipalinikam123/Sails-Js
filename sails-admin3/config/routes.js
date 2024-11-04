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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /api/enterprise': 'EnterpriseController.createEnterprise',
  'DELETE /enterprise/remove/:id': 'EnterpriseController.removeEnterprise',
  'POST /enterprise/update/:id': 'EnterpriseController.updateEnterprise',
  'GET /enterpriselist': 'EnterpriseController.getEnterpriseList',
  'GET /enterpriselist/:id': 'EnterpriseController.getEnterpriseDetail',
  'GET /adminenterprise/:id': 'EnterpriseController.getAdminEnterprise',
  'POST /api/signin': 'AuthController.signin',
  'GET /api/user': 'UserController.getAllUser',
  'POST /api/adduser': 'UserController.addUser',
  'POST /api/user/:id': 'UserController.updateUser',
  'GET /api/userToken': 'UserController.getUserByToken',
  'GET /userprofile/:id': 'UserController.userProfile',
  'DELETE /user/remove/:id': 'UserController.removeUser',

  'GET /login': { view: 'pages/login' },
  'GET /createEnterprise': { view: 'pages/createEnterprise' },



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
