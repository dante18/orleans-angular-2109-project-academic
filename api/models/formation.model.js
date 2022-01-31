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
      primaryKey: true,
      field: "id"
    },
    name: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true,
      field: "name"
    },
    description: {
      type: SequelizeInstance.TEXT,
      field: "description"
    },
    price: {
      type: SequelizeInstance.DECIMAL(19, 2),
      allowNull: false,
      field: "price"
    },
    level: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "level"
    },
    category: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "category"
    },
    programm: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "programm"
    },
    duration: {
      type: SequelizeInstance.INTEGER,
      allowNull: false,
      field: "duration"
    },
    dateAvailable: {
      type: SequelizeInstance.DATE,
      defaultValue: SequelizeInstance.NOW,
      field: "date_available"
    }
  }, {tableName: "formations"});

  return Formation;
};

