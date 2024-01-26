'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios_areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'areas', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios_areas');
  }
};
