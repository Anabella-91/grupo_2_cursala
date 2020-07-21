'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, 
  {
    timestamps : false,
    tableName : 'categories'
  });
  
  Category.associate = function(models) {
    
    Category.hasMany(models.Products, {
      as: 'products',
      foreignKey: 'id_category'
    });
    
  };
  
  return Category;
};