/**
 * Define the session entity
 *
 * @param cnx Current connection to the database
 * @param SequelizeInstance Sequelize instance
 * @returns {*} Return a promise after model initialization
 */
module.exports = (cnx, SequelizeInstance) => {
  const Session = cnx.define("session", {
    id: {
      type: SequelizeInstance.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id"
    },
    dateStart: {
      type: SequelizeInstance.DATE,
      allowNull: true,
      defaultValue: SequelizeInstance.NOW,
      field: "date_start"
    },
    dateEnd: {
      type: SequelizeInstance.DATE,
      allowNull: true,
      defaultValue: SequelizeInstance.NOW,
      field: "date_end"
    }
  }, {tableName: "sessions"});

  return Session;
};


