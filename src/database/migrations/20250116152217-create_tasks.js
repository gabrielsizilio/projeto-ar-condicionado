'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ares_condicionados', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      temperatura_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'temperaturas', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM("pending", "completed"),
        allowNull: false,
        defaultValue: "pending"
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
    await queryInterface.dropTable('tasks');
  }
};
