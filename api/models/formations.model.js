module.exports = (cnx, SequelizeInstance, modelAssociate) => {
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
      type: SequelizeInstance.DECIMAL(19,4),
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
  });

  if (modelAssociate != null) {
    Formation.belongsTo(modelAssociate);
  }

  return Formation;
};

