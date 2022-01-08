module.exports = (cnx, SequelizeInstance, modelAssociate = null) => {
  const Category = cnx.define("category", {
    id: {
      type: SequelizeInstance.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: SequelizeInstance.STRING,
      allowNull: false,
      unique: true
    }
  });

  if (modelAssociate != null) {
    Category.hasMany(modelAssociate);
  }

  return Category;
};


