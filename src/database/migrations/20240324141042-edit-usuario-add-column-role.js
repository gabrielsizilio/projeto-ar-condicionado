'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'role_id', { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
     });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'role_id');
  }
};
