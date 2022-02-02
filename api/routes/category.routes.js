const formations = require("../controllers/formation.controller");
module.exports = app => {
  const categories = require("../controllers/category.controller");
  const router = require("express").Router();

  // Retrieve all Category
  router.get("/", categories.findAll);

  // Retrieve a single Category with id
  router.get("/:id", categories.findByID);

  // Retrieve a single Formation by name
  router.get("/search/:name", categories.findByName);

  // Create a new Category
  router.post("/", categories.create);

  // Update a Category with id
  router.put("/:id", categories.update);

  // Delete a Category with id
  router.delete("/:id", categories.delete);

  app.use('/api/categories', router);
};
