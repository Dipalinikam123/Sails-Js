/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// api/models/User.js

module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    age: {
      type: 'number',
      required: true,
    },
    token: {
      type: 'string',
      // Use `defaultsTo` if you need a default value, or omit it entirely if unnecessary
      defaultsTo: '',
    }
  }
};


