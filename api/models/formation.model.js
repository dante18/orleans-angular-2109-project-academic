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
      field: "name",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    description: {
      type: SequelizeInstance.TEXT,
      field: "description",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    price: {
      type: SequelizeInstance.DECIMAL(19, 2),
      allowNull: false,
      field: "price",
      validate: {
        isNumber: true,
        notEmpty: true
      }
    },
    level: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "level",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    category: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "category",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    programm: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "programm",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    duration: {
      type: SequelizeInstance.INTEGER,
      allowNull: false,
      field: "duration",
      validate: {
        isNumber: true,
        notEmpty: true
      }
    },
    dateAvailable: {
      type: SequelizeInstance.DATE,
      defaultValue: SequelizeInstance.NOW,
      field: "date_available",
      validate: {
        isDate: true,
        notEmpty: true
      }
    }
  }, {tableName: "formations"});

  return Formation;
};

