module.exports = app => {
  const levels = require("../controllers/level.controller");
  const router = require("express").Router();

  // Retrieve all Category
  router.get("/", levels.findAll);

  app.use('/api/levels', router);
};
