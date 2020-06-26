'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    descripcion: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    categories: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    horas: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    apuntes: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    ejercicios: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    precio: {
      allowNull: false,
      type : DataTypes.INTEGER
    },
    duracion : {
      allowNull: false,
      type : DataTypes.INTEGER
    }
  }, 
  {
    timestamps : false,
    tableName : 'products'
  });
  Product.associate = function(models) {
    
    Product.belongsTo(models.Categories, {
      as: 'category',
      foreignKey: 'id_category'
    });
    Product.belongsToMany(models.Users,{
      as: 'users',
      through: 'orders',
      foreignKey: 'id_product',
      otherKey: 'id_user',
      timestamps: false
    })
  
  };

  return Product;
};