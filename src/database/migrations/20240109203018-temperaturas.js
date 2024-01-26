'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('temperaturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'modelos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      temp16: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp17: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp18: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp19: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp20: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp21: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp22: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp23: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp24: {
        allowNull: true,
        type: Sequelize.STRING
      },
      temp25: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('temperaturas');
  }
};
