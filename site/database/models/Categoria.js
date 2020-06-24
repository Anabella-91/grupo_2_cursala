'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
    // aca va la relacion con la tabla de productos
    Category.hasMany(models.Products, {
      as: 'products',
      foreignKey: 'category_id'
    });
  };
  return Category;
};