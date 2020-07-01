'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      type : DataTypes.STRING(50)
    },
    password : {
      allowNull: false,
      type : DataTypes.STRING(200)
    },
    imagen : {
      allowNull: false,
      type : DataTypes.STRING(400)
    }
  }, 
  {
    timestamps : false,
    tableName : 'users'
  });
  User.associate = function(models) {
   
    
  };

  return User;
};
