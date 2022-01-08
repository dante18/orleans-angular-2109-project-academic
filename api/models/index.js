const dbConfig = require("../config/config").database;
const environment = require("../config/config").environment;

/* Sequelize import */
const Sequelize = require("sequelize");

/* Creation of Squelize object used to connect to database */
const cnx = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: environment === "dev"
});

const db = {};

db.Sequelize = Sequelize;
db.cnx = cnx;

db.categories = require("./categories.model.js")(db.cnx, db.Sequelize);
db.formers = require("./formers.model")(db.cnx, db.Sequelize);
db.formations = require("./formations.model.js")(db.cnx, db.Sequelize, [db.categories, db.formers]);

module.exports = db;
