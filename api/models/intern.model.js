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
      unique: true,
      field: "civility",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    lastname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true,
      field: "lastname",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    firstname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true,
      field: "firstname",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    phoneNumber: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "phone_number",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    emailAddress: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      field: "email_address",
      validate: {
        is: ["^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", 'i'],
        notEmpty: true
      }
    },
    photo: {
      type: SequelizeInstance.STRING,
      allowNull: true,
      field: "photo",
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    }
  }, {tableName: "interns"});

  return Intern;
};


