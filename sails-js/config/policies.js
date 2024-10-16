/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  // Allow all actions in the `AuthController` to be accessible without authentication
  AuthController: {
    '*': true,
  },

  // UserController policies
  UserController: {
    '*': 'isLoggedIn', // Apply 'isLoggedIn' policy to all actions by default

    // Specify custom policies for specific actions
    // getAllUser: ['isLoggedIn',isAdmin], 
    // update: 'isLoggedIn',  
    // login :true    //By setting this to true, you are allowing anyone, whether logged in or not, to access the login action
  },

  /***************************************************************************
  *                                                                         *
  * Default policy for all controllers and actions, unless overridden.      *
  * (`true` allows public access)                                           *
  *                                                                         *
  ***************************************************************************/

  // Default policy can be set here if needed
  // '*': true,
};
