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
      off: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp16: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp17: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp18: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp19: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp20: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp21: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp22: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp23: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp24: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      temp25: {
        allowNull: true,
        type: Sequelize.TEXT
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
