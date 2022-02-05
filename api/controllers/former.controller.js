const db = require("../models");
const Former = db.former;

/**
 * Retrieve all Formers from the database.
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findAll = (request, response) => {
  Former.findAll()
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Formers: " + error.message
      });
    });
};

/**
 * Find a single Former with an id
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findByID = (request, response) => {
  const id = request.params.id;

  Former.findByPk(id)
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message: "Error retrieving Former with id=" + id + ". Error invoked: " + error.message
      });
    });
};


/**
 * Find a single Former with a name
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findByName = (request, response) => {
  const formerName = request.params.name;
  const {Op} = require("sequelize");

  Former.findAll({
    where: {
      lastname: {
        [Op.substring]: `%${formerName}%`,
      }
    }
  })
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
 * Create and Save a new Former
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.create = (request, response) => {
  // Validate request
  if (!request.body.lastname && !request.body.firstname) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Former
  const former = {
    civility: request.body.civility,
    lastname: request.body.lastname,
    firstname: request.body.firstname,
    phoneNumber: request.body.phoneNumber,
    emailAddress: request.body.emailAddress,
    salary: request.body.salary,
    photo: request.body.photo
  };

  // Save Former in the database
  Former.create(former)
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while creating the Former: " + error.message
      });
    });
};

/**
 * Update a Former by the id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.update = (request, response) => {
  const id = request.params.id;

  Former.update(request.body, {
    where: { id: id }
  })
    .then(() => {
      response.send({
        message: "Former was updated successfully."
      });
    })
    .catch(error => {
      response.status(500).send({
        message: "Error updating Former with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Delete a Former with the specified id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.delete = (request, response) => {
  const id = request.params.id;

  Former.destroy({
    where: { id: id }
  })
    .then(() => {
      response.send({
        message: "Former was deleted successfully!"
      });
    })
    .catch(error => {
      response.status(500).send({
        message: "Could not delete Former with id=" + id + ". Error invoked: " + error.message
      });
    });
};


