/**
 * Define the former entity
 *
 * @param cnx Current connection to the database
 * @param SequelizeInstance Sequelize instance
 * @returns {*} Return a promise after model initialization
 */
module.exports = (cnx, SequelizeInstance) => {
  const Former = cnx.define("former", {
    id: {
      type: SequelizeInstance.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id"
    },
    lastname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true,
      field: "lastname"
    },
    firstname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true,
      field: "firstname"
    },
    phoneNumber: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "phone_number"
    },
    emailAddress: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "email_address"
    },
    salary: {
      type: SequelizeInstance.DECIMAL(19, 2),
      allowNull: false,
      field: "salary"
    },
    photo: {
      type: SequelizeInstance.STRING,
      allowNull: true,
      field: "photo"
    }
  }, {tableName: "formers"});

  return Former;
};


