/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],



    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },

};



// If CSRF protection is enabled in your Sails app, it will be applied automatically as part of the request cycle, usually after the session middleware.

// When CSRF is enabled, Sails.js automatically provides a CSRF token. You can use this token in your views to protect form submissions.
// If you have specific routes that don’t need CSRF protection, you can configure them in config/routes.js
// module.exports.routes = {
//   'POST /public-endpoint': {
//     controller: 'PublicController',
//     action: 'handleRequest',
//     csrf: false // Disable CSRF for this route
//   }
// };
// CSRF protection is primarily used for requests that modify data, such as POST, PUT, PATCH, and DELETE requests. This is because these types of requests can change the state of the server, like creating, updating, or deleting resources, which makes them vulnerable to CSRF attacks.