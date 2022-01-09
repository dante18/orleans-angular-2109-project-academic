module.exports = app => {
  const interns = require("../controllers/intern.controller");
  const router = require("express").Router();

  // Retrieve all Intern
  router.get("/", interns.findAll);

  // Retrieve a single Former with id
  router.get("/:id", interns.findByID);

  // Create a new Intern
  router.post("/", interns.create);

  // Update an Intern with id
  router.put("/:id", interns.update);

  // Delete an Intern with id
  router.delete("/:id", interns.delete);

  app.use('/api/interns', router);
};
