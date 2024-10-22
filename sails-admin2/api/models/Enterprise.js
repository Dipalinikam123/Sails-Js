/**
 * Enterprise.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    logo: {
      type: "string",
    },
    employeeCount: {
      type: "number",
      required: true,
    },
    manager: {
      type: "json", // Use JSON to store all manager details
      required: true,
      custom: function (value) {
        // Optional: Validate the structure of the manager object
        return (
          typeof value === "object" &&
          value !== null &&
          typeof value.name === "string" &&
          typeof value.email === "string" &&
          typeof value.department === "string"
        );
      },
    },
    role: {
      type: "number",
    },
  },
};
