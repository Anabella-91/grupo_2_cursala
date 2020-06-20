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
    }
  }, 
  {
    timestamps : false,
    tableName : 'users'
  });
  User.associate = function(models) {
    User.belongsToMany(models.Products,{
      as: 'products',
      through: 'orders',
      foreignKey: 'user_id',
      otherKey: 'product_id',
      timestamps: false
    })
  };
  return User;
};


