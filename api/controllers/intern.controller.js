const db = require("../models");
const Intern = db.intern;

/**
 * Retrieve all Interns from the database.
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findAll = (request, response) => {
  Intern.findAll()
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Interns: " + error.message
      });
    });
};

/**
 * Find a single Intern with an id
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.findByID = (request, response) => {
  const id = request.params.id;

  Intern.findByPk(id)
    .then(data => {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: `Cannot find Intern with id=${id}.`
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: "Error retrieving Intern with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Create and Save a new Intern
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.create = (request, response) => {
  // Validate request
  if (!request.body.lastname && !request.body.firstname && !request.body.email) {
    response.status(400).send({
      message: "The lastname, firstname and email properties were not found in the request body."
    });

    return;
  }

  // Create an Intern
  const intern = {
    lastname: request.body.lastname,
    firstname: request.body.firstname,
    email: request.body.email,
    photo: request.body.photo
  };

  // Save Intern in the database
  Intern.create(intern)
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while creating the Intern. Error invoked: " + error.message
      });
    });
};

/**
 * Update an Intern by the id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.update = (request, response) => {
  const id = request.params.id;

  Intern.update(request.body, {
    where: { id: id }
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();
      console.log("****", returnSequelize);

      if (codeReturn === "1") {
        response.send({
          message: "Intern was updated successfully."
        });
      } else {
        response.send({
          message: `Cannot update Intern with id=${id}. Maybe Intern was not found or request.body is empty!`
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: "Error updating Intern with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Delete an Intern with the specified id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.delete = (request, response) => {
  const id = request.params.id;

  Intern.destroy({
    where: { id: id }
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();
      if (codeReturn === "1") {
        response.send({
          message: "Intern was deleted successfully!"
        });
      } else {
        response.send({
          message: `Cannot delete Intern with id=${id}. Maybe Intern was not found!`
        });
      }
    })
    .catch(error => {
      response.status(500).send({
        message: "Could not delete Intern with id=" + id + ". Error invoked: " + error.message
      });
    });
};


