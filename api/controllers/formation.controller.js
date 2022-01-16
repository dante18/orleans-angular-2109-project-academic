const db = require("../models");
const Formation = db.formation;

/**
 * Retrieve all Formations from the database.
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findAll = (request, response) => {
  Formation.findAll({include: ['category', 'former', 'intern']})
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while retrieving formations: " + error.message
      });
    });
};

/**
 * Find a single Formation with an id
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findByID = (request, response) => {
  const id = request.params.id;

  Formation.findByPk(id, {include: ['category', "former", 'intern']})
    .then(data => {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: `Cannot find Formation with id=${id}.`
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: "Error retrieving Formation with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Find all Formations with a category
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findByCategory = (request, response) => {
  const category = request.params.category;
  Formation.findAll({
    include: [
      { model: 'category', attributes: ['name'], where:
          {
            name: category
          }
      },
      { model: "former" },
      { model: 'intern' }
    ]
  })
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Formations: " + error.message
      });
    });
};

/**
 * Create and Save a new Formation
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

  // Create a Formation
  const formation = {
    name: request.body.name,
    dateStart: request.body.dateStart,
    duration: request.body.duration,
    price: request.body.price,
    level: request.body.level,
    programm: request.body.programm,
    is_online: request.body.online,
    categoryId: request.body.categoryId,
    formerId: request.body.formerId,
    internId: request.body.internId
  };

  // Save Formation in the database
  Formation.create(formation)
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while creating the Formation: " + error.message
      });
    });
};

/**
 * Update a Formation by the id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.update = (request, response) => {
  const id = request.params.id;

  Formation.update(request.body, {
    where: {id: id}
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();

      if (codeReturn === "1") {
        response.send({
          message: "Formation was updated successfully."
        });
      } else {
        response.send({
          message: `Cannot update Formation with id=${id}. Maybe Formation was not found or request.body is empty!`
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: "Error updating Formation with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Delete a Formation with the specified id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.delete = (request, response) => {
  const id = request.params.id;

  Formation.destroy({
    where: {id: id}
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();

      if (codeReturn === "1") {
        response.send({
          message: "Formation was deleted successfully!"
        });
      } else {
        response.send({
          message: `Cannot delete Formation with id=${id}. Maybe Formation was not found!`
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: "Could not delete Formation with id=" + id + ". Error invoked: " + error.message
      });
    });
};


