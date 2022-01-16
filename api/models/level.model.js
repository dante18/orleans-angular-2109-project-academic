/**
 * Define the level entity
 *
 * @param cnx Current connection to the database
 * @param SequelizeInstance Sequelize instance
 * @returns {*} Return a promise after model initialization
 */
module.exports = (cnx, SequelizeInstance) => {
  const Level = cnx.define("level", {
    id: {
      type: SequelizeInstance.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id"
    },
    name: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true,
      field: "name"
    }
  }, {tableName: "levels"});

  return Level;
};


