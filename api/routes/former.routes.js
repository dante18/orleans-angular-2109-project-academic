module.exports = app => {
  const formers = require("../controllers/former.controller");
  const router = require("express").Router();

  // Retrieve all Former
  router.get("/", formers.findAll);

  // Retrieve a single Former with id
  router.get("/:id", formers.findByID);

  // Create a new Former
  router.post("/", formers.create);

  // Update a Former with id
  router.put("/:id", formers.update);

  // Delete a Former with id
  router.delete("/:id", formers.delete);

  app.use('/api/formers', router);
};
