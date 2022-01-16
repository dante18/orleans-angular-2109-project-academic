/**
 * Define the category entity
 *
 * @param cnx Current connection to the database
 * @param SequelizeInstance Sequelize instance
 * @returns {*} Return a promise after model initialization
 */
module.exports = (cnx, SequelizeInstance) => {
  const Category = cnx.define("category", {
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
  }, {tableName: "categories"});

  return Category;
};


