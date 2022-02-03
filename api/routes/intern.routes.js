module.exports = app => {
  const interns = require("../controllers/intern.controller");
  const router = require("express").Router();

  // Retrieve all Former
  router.get("/", interns.findAll);

  // Retrieve a single Former with id
  router.get("/:id", interns.findByID);

  // Retrieve Former with name
  router.get("/search/:name", interns.findByName);

  // Create a new Former
  router.post("/", interns.create);

  // Update a Former with id
  router.put("/:id", interns.update);

  // Delete a Former with id
  router.delete("/:id", interns.delete);

  app.use('/api/formers', router);
};
