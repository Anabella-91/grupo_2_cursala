'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    name: DataTypes.STRING(50),
    descripcion: DataTypes.STRING(50),
    horas: DataTypes.STRING(50),
    ejercicios: DataTypes.STRING(50),
    precio: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER
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

  };

  return Product;
};