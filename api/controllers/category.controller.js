const db = require("../models");
const Category = db.category;

/**
 * Retrieve all Categories from the database.
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findAll = (request, response) => {
  Category.findAll()
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Categories: " + error.message
      });
    });
};
