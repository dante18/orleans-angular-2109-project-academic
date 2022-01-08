const db = require("../models");
const Category = db.categories;

// Retrieve all Categories from the database.
exports.findAll = (request, response) => {
  Category.findAll()
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories."
      });
    });
};

// Find a single Category with an id
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
    .catch(() => {
      response.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
};

// Create and Save a new Category
exports.create = (request, response) => {
  // Validate request
  if (!request.body.name) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Category
  const category = { name: request.body.name };

  // Save Category in the database
  Category.create(category)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

// Update a Category by the id in the request
exports.update = (request, response) => {
  const id = request.params.id;

  Category.update(request.body, {
    where: { id: id }
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();

      if (codeReturn === "1") {
        response.send({
          message: "Category was updated successfully."
        });
      } else {
        response.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or request.body is empty!`
        });
      }
    })
    .catch(() => {
      response.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (request, response) => {
  const id = request.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(returnSequelize => {
      const codeReturn = returnSequelize.join();
      if (codeReturn === "1") {
        response.send({
          message: "Category was deleted successfully!"
        });
      } else {
        response.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      response.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};


