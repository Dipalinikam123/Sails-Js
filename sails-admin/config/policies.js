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
  AuthController: {
    '*': true,
  },

  // UserController policies
  UserController: {
    '*': 'isLoggedIn',
    deleteUser:'isLoggedIn',
    updateUser:'isLoggedIn',
    removeUser:'isLoggedIn',
  },
  DashboardController:{
    dashboard:'isLoggedIn'
  },
  EnterpriseController: {
    '*': 'isLoggedIn',
    getAdminEnterprise:'isAdmin',
    createEnterprise:'isSuperAdmin',
    getEnterprise:'isSuperAdmin',
    getEnterpriseList:'isSuperAdmin',
    getEnterpriseDetail:'isSuperAdmin',
  },
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

};
