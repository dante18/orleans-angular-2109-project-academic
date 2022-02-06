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
      response.send(data);
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

  let regExpPhoneNumber = new RegExp('/\\b0[1-689]([-. ]?\\d{2}){4}\\b/');
  if (!request.body.phoneNumber || request.body.phoneNumber.length === 0 || !regExpPhoneNumber.test(request.body.phoneNumber)) {
    responseMessage = responseMessage + " phoneNumber";
    errorNumber+=1;
  }

  let regExpEmail = new RegExp('/\\b[\\w.%+-]+@[a-zA-Z\\d.-]+\\.[A-Za-z]{2,4}\\b/');
  if (!request.body.emailAddress || request.body.emailAddress.length === 0 || !regExpEmail.test(request.body.emailAddress)) {
    responseMessage = responseMessage + " emailAddress";
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

  // Create a Intern
  const intern = {
    civility: request.body.civility,
    lastname: request.body.lastname,
    firstname: request.body.firstname,
    phoneNumber: request.body.phoneNumber,
    emailAddress: request.body.emailAddress,
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
          error.message || "Some error occurred while creating the Intern: " + error.message
      });
    });
};

/**
 * Update a Intern by the id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.update = (request, response) => {
  const id = request.params.id;

  Intern.update(request.body, {
    where: { id: id }
  })
    .then(() => {
      response.send({
        message: "Intern was updated successfully."
      });
    })
    .catch(error => {
      response.status(500).send({
        message: "Error updating Intern with id=" + id + ". Error invoked: " + error.message
      });
    });
};

/**
 * Delete a Intern with the specified id in the request
 *
 * @param request Contains the API request
 * @param response Contains the API response
 */
exports.delete = (request, response) => {
  const id = request.params.id;

  Intern.destroy({
    where: { id: id }
  })
    .then(() => {
      response.send({
        message: "Intern was deleted successfully!"
      });
    })
    .catch(error => {
      response.status(500).send({
        message: "Could not delete Intern with id=" + id + ". Error invoked: " + error.message
      });
    });
};


