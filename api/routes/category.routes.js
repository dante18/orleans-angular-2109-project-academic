module.exports = app => {
  const categories = require("../controllers/category.controller");
  const router = require("express").Router();

  // Retrieve all Category
  router.get("/", categories.findAll);

  app.use('/api/categories', router);
};
