'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      descripcion: { type: Sequelize.STRING },
      categories: { type: Sequelize.STRING },
      horas: { type: Sequelize.STRING },
      apuntes: { type: Sequelize.STRING },
      ejercicios: { type: Sequelize.STRING },
      precio: {type: Sequelize.STRING },
      duracion: { type: Sequelize.STRING },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};