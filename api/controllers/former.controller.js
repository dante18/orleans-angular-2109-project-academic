const db = require("../models");
const Former = db.formers;

// Retrieve all Formers from the database.
exports.findAll = (request, response) => {
  Former.findAll()
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Formers."
      });
    });
};

// Find a single Former with an id
exports.findByID = (request, response) => {
  const id = request.params.id;

  Former.findByPk(id)
    .then(data => {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: `Cannot find Former with id=${id}.`
        });
      }
    })
    .catch(() => {
      response.status(500).send({
        message: "Error retrieving Former with id=" + id
      });
    });
};

// Create and Save a new Former
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
    lastname: request.body.lastname,
    firstname: request.body.firstname,
    salary: request.body.salary,
    phone: request.body.phone,
    photo: request.body.photo
  };

  // Save Former in the database
  Former.create(former)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while creating the Former."
      });
    });
};

// Update a Former by the id in the request
exports.update = (request, response) => {
  const id = request.params.id;

  Former.update(request.body, {
    where: { id: id }
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();

      if (codeReturn === "1") {
        response.send({
          message: "Former was updated successfully."
        });
      } else {
        response.send({
          message: `Cannot update Former with id=${id}. Maybe Former was not found or request.body is empty!`
        });
      }
    })
    .catch(() => {
      response.status(500).send({
        message: "Error updating Former with id=" + id
      });
    });
};

// Delete a Former with the specified id in the request
exports.delete = (request, response) => {
  const id = request.params.id;

  Former.destroy({
    where: { id: id }
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();
      if (codeReturn === "1") {
        response.send({
          message: "Former was deleted successfully!"
        });
      } else {
        response.send({
          message: `Cannot delete Former with id=${id}. Maybe Former was not found!`
        });
      }
    })
    .catch(err => {
      response.status(500).send({
        message: "Could not delete Former with id=" + id
      });
    });
};


