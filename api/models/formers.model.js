module.exports = (cnx, SequelizeInstance) => {
  const Former = cnx.define("former", {
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
    salary: {
      type: SequelizeInstance.DECIMAL(19,4),
      allowNull: false
    },
    phone: {
      type: SequelizeInstance.STRING,
      allowNull: false
    },
    photo: {
      type: SequelizeInstance.STRING,
      allowNull: true
    }
  });

  return Former;
};


