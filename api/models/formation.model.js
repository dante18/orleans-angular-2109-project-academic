/**
 * Define the formation entity
 *
 * @param cnx Current connection to the database
 * @param SequelizeInstance Sequelize instance
 * @returns {*} Return a promise after model initialization
 */
module.exports = (cnx, SequelizeInstance) => {
  const Formation = cnx.define("formation", {
    id: {
      type: SequelizeInstance.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true
    },
    dateStart: {
      type: SequelizeInstance.DATE,
      defaultValue: SequelizeInstance.NOW
    },
    duration: {
      type: SequelizeInstance.INTEGER,
      allowNull: false
    },
    price: {
      type: SequelizeInstance.DECIMAL(19, 4),
      allowNull: false
    },
    level: {
      type: SequelizeInstance.STRING,
      allowNull: false
    },
    programm: {
      type: SequelizeInstance.TEXT,
      allowNull: false
    },
    is_online: {
      type: SequelizeInstance.BOOLEAN,
      defaultValue: false
    }
  }, {tableName: "formation"});

  return Formation;
};

