const db = require("../models");
const Formation = db.formation;

/**
 * Retrieve all Formations from the database.
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findAll = (request, response) => {
  Formation.findAll()
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

  Formation.findByPk(id)
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
  Formation.findAll({where: {category: category}})
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
  // Validate request
  let responseMessage = "The property(ies) are not filled in or incorrect: ";
  let errorNumber = 0;

  if (!request.body.name || request.body.name.length === 0) {
    responseMessage = responseMessage + "name";
    errorNumber+=1;
  }

  if (!request.body.description || request.body.description.length === 0) {
    responseMessage = responseMessage + " description";
    errorNumber+=1;
  }

  if (!request.body.price || request.body.price === 0 || isNaN(request.body.price)) {
    responseMessage = responseMessage + " price";
    errorNumber+=1;
  }

  if (!request.body.level || request.body.level.length === 0) {
    responseMessage = responseMessage + " level";
    errorNumber+=1;
  }

  if (!request.body.category || request.body.category.length === 0) {
    responseMessage = responseMessage + " category";
    errorNumber+=1;
  }

  if (!request.body.program || request.body.program.length === 0) {
    responseMessage = responseMessage + " programm";
    errorNumber+=1;
  }

  if (!request.body.duration || request.body.duration === 0 || isNaN(request.body.duration)) {
    responseMessage = responseMessage + " duration";
    errorNumber+=1;
  }

  if (!request.body.dateAvailable || request.body.dateAvailable.length === 0) {
    responseMessage = responseMessage + " dateAvailable";
    errorNumber+=1;
  }

  if (errorNumber > 0) {
    response.status(400).send({
      message: responseMessage
    });
    return;
  }

  // Create a Formation
  const formation = {
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    level: request.body.level,
    category: request.body.category,
    program: request.body.program,
    duration: request.body.duration,
    dateAvailable: request.body.dateAvailable
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
    .then(() => {
      response.send({
        message: "Formation was updated successfully."
      });
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
    .then(() => {
      response.send({
        message: "Formation was deleted successfully!"
      });
    })
    .catch(error => {
      response.status(500).send({
        message: "Could not delete Formation with id=" + id + ". Error invoked: " + error.message
      });
    });
};
