const dbConfig = require("../config/config").database;
const environment = require("../config/config").environment;
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
db.category = require("./category.model.js")(db.cnx, db.Sequelize);
db.former = require("./former.model")(db.cnx, db.Sequelize);
db.intern = require("./intern.model")(db.cnx, db.Sequelize);
db.level = require("./level.model")(db.cnx, db.Sequelize);
db.session = require("./session.model")(db.cnx, db.Sequelize);
db.formation = require("./formation.model.js")(db.cnx, db.Sequelize);

/* Add associations between models */
db.formation.belongsTo(db.level, {
  foreignKey: {
    name: "level_id",
    allowNull: true
  },
  as: 'level', onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

db.formation.belongsTo(db.category, {
  foreignKey: {
    name: "category_id",
    allowNull: true
  },
  as: 'category', onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

db.formation.hasMany(db.session, {
  foreignKey: {
    name: "session_id",
    allowNull: true
  },
  as: 'sessions', onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

db.category.hasMany(db.formation, {
  foreignKey: {
    name: "formation_id",
    allowNull: true
  },
  as: 'formation', onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

db.session.belongsTo(db.former, {
  foreignKey: {
    name: "former_id",
    allowNull: true
  },
  as: 'former', onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

db.session.hasMany(db.intern, {
  foreignKey: {
    name: "intern_id",
    allowNull: true
  },
  as: 'intern', onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

module.exports = db;
