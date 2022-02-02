const dbConfig = require("../../config/config").database;
const environment = require("../../config/config").environment;
const db = {};

/* Sequelize import */
const Sequelize = require("sequelize");

/* Creation of Squelize object used to connect to database */
const cnx = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: environment === "dev"
});
db.Sequelize = Sequelize;
db.cnx = cnx;

/* Initialize the models and store their return in a variable of type JS object */
db.former = require("./former.model")(db.cnx, db.Sequelize);
db.category = require("./category.model")(db.cnx, db.Sequelize);
db.level = require("./level.model")(db.cnx, db.Sequelize);
db.formation = require("./formation.model")(db.cnx, db.Sequelize);

module.exports = db;
