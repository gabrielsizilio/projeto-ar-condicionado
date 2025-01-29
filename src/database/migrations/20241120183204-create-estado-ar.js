'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estado_ares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "ares_condicionados", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      temp: {
        allowNull: false,
        type: Sequelize.ENUM("off", "temp16", "temp17", "temp18", "temp19", "temp20", "temp21", "temp22", "temp23", "temp24", "temp25")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('estado_ares');
  }
};