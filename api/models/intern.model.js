/**
 * Define the intern entity
 *
 * @param cnx Current connection to the database
 * @param SequelizeInstance Sequelize instance
 * @returns {*} Return a promise after model initialization
 */
module.exports = (cnx, SequelizeInstance) => {
  const Intern = cnx.define("intern", {
    id: {
      type: SequelizeInstance.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id"
    },
    civility: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "civility"
    },
    lastname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "lastname"
    },
    firstname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
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
    photo: {
      type: SequelizeInstance.STRING,
      allowNull: true,
      field: "photo"
    }
  }, {tableName: "interns"});

  return Intern;
};


