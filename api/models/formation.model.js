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
    shortDescription: {
      type: SequelizeInstance.TEXT,
      field: "short_description"
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
    isAvailable: {
      type: SequelizeInstance.BOOLEAN,
      defaultValue: false,
      field: "is_available"
    }
  }, {tableName: "formations"});

  return Formation;
};

