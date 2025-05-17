'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable("task_weekly", {
      task_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'task',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      Weekday: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Time: {
        type: Sequelize.TIME,
        allowNull: false
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
      await queryInterface.dropTable('task_weekly');
  }
};
