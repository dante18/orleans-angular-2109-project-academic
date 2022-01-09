module.exports = app => {
  const formations = require("../controllers/formation.controller");
  const router = require("express").Router();

  // Retrieve all Formations
  router.get("/", formations.findAll);

  // Retrieve a single Formation with id
  router.get("/:id", formations.findByID);

  // Retrieve all Formation by category
  router.get("/category/:category", formations.findByCategory);

  // Create a new Formation
  router.post("/", formations.create);

  // Update a Formation with id
  router.put("/:id", formations.update);

  // Delete a Formation with id
  router.delete("/:id", formations.delete);

  app.use('/api/formations', router);
};
