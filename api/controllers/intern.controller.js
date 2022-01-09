const db = require("../models");
const Intern = db.intern;

// Retrieve all Interns from the database.
exports.findAll = (request, response) => {
  Intern.findAll()
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Interns."
      });
    });
};

// Find a single Intern with an id
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
    .catch(() => {
      response.status(500).send({
        message: "Error retrieving Intern with id=" + id
      });
    });
};

// Create and Save a new Intern
exports.create = (request, response) => {
  // Validate request
  if (!request.body.lastname && !request.body.firstname) {
    response.status(400).send({
      message: "Content can not be empty!"
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
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while creating the Intern."
      });
    });
};

// Update an Intern by the id in the request
exports.update = (request, response) => {
  const id = request.params.id;

  Intern.update(request.body, {
    where: { id: id }
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();

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
    .catch(() => {
      response.status(500).send({
        message: "Error updating Intern with id=" + id
      });
    });
};

// Delete an Intern with the specified id in the request
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
    .catch(err => {
      response.status(500).send({
        message: "Could not delete Intern with id=" + id
      });
    });
};


