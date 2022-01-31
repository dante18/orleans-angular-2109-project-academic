const db = require("../models");
const Level = db.level;

/**
 * Retrieve all Categories from the database.
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findAll = (request, response) => {
  Level.findAll()
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Levels: " + error.message
      });
    });
};
