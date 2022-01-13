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
      primaryKey: true
    },
    lastname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: SequelizeInstance.STRING,
      allowNull: false
    },
    photo: {
      type: SequelizeInstance.STRING,
      allowNull: true
    }
  }, {tableName: "intern"});

  return Intern;
};


