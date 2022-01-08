const db = require("../models");
const Formation = db.formations;

// Retrieve all Formations from the database.
exports.findAll = (request, response) => {
  Formation.findAll({include: ['category']})
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving formations."
      });
    });
};

// Find a single Formation with an id
exports.findByID = (request, response) => {
  const id = request.params.id;

  Formation.findByPk(id, {include: ['category']})
    .then(data => {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: `Cannot find Formation with id=${id}.`
        });
      }
    })
    .catch(() => {
      response.status(500).send({
        message: "Error retrieving Formation with id=" + id
      });
    });
};

// Find all Formations with a category
exports.findByCategory = (request, response) => {
  const category = request.params.category;

  Formation.findAll({ where: { category: category } })
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Formations."
      });
    });
};

// Create and Save a new Formation
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
    categoryId: request.body.categoryId
  };

  // Save Formation in the database
  Formation.create(formation)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while creating the Formation."
      });
    });
};

// Update a Formation by the id in the request
exports.update = (request, response) => {
  const id = request.params.id;

  Formation.update(request.body, {
    where: { id: id }
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
    .catch(() => {
      response.status(500).send({
        message: "Error updating Formation with id=" + id
      });
    });
};

// Delete a Formation with the specified id in the request
exports.delete = (request, response) => {
  const id = request.params.id;

  Formation.destroy({
    where: { id: id }
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
    .catch(err => {
      response.status(500).send({
        message: "Could not delete Formation with id=" + id
      });
    });
};


