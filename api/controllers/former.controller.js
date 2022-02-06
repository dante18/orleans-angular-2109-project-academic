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
 * Create and Save a new Former
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.create = (request, response) => {
  // Validate request
  let responseMessage = "The property(ies) are not filled in or incorrect: ";
  let errorNumber = 0;

  if (!request.body.civility || request.body.civility.length === 0) {
    responseMessage = responseMessage + "civility";
    errorNumber+=1;
  }

  if (!request.body.firstname || request.body.firstname.length === 0) {
    responseMessage = responseMessage + " firstname";
    errorNumber+=1;
  }

  if (!request.body.lastname || request.body.lastname.length === 0) {
    responseMessage = responseMessage + " lastname";
    errorNumber+=1;
  }

  if (!request.body.phoneNumber || request.body.phoneNumber.length === 0) {
    responseMessage = responseMessage + " phoneNumber";
    errorNumber+=1;
  }

  if (!request.body.emailAddress || request.body.emailAddress.length === 0) {
    responseMessage = responseMessage + " emailAddress";
    errorNumber+=1;
  }

  if (!request.body.salary || request.body.salary === 0 || isNaN(request.body.salary)) {
    responseMessage = responseMessage + " salary";
    errorNumber+=1;
  }

  if (!request.body.photo || request.body.photo.length === 0) {
    responseMessage = responseMessage + " photo";
    errorNumber+=1;
  }

  if (errorNumber > 0) {
    response.status(400).send({
      message: responseMessage
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


