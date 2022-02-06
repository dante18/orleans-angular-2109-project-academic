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

/**
 * Find a single Category with an id
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findByID = (request, response) => {
  const id = request.params.id;

  Category.findByPk(id)
    .then(data => {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: "Error retrieving Category with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Create and Save a new Category
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.create = (request, response) => {
  // Validate request
  if (!request.body.name) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Category
  const category = { name: request.body.name, logo: request.body.logo ?? "/assets/img/undraw_learning.png" };

  // Save Category in the database
  Category.create(category)
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while creating the Category: " + error.message
      });
    });
};

/**
 * Update a Category by the id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.update = (request, response) => {
  const id = request.params.id;

  Category.update(request.body, {
    where: { id: id }
  })
    .then(() => {
      response.send({
        message: "Category was updated successfully."
      });
    })
    .catch(error => {
      response.status(500).send({
        message: "Error updating Category with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Delete a Category with the specified id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.delete = (request, response) => {
  const id = request.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(() => {
      response.send({
        message: "Category was deleted successfully!"
      });
    })
    .catch(error => {
      response.status(500).send({
        message: "Could not delete Category with id=" + id + ". Error invoked: " + error.message
      });
    });
};


