'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('predios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('predios')
  }
};
