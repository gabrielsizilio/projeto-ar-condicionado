'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('logs', 'logs_ibfk_1');

    await queryInterface.addConstraint('logs', {
      fields: ['usuario_id'],
      type: 'foreign key',
      name: 'logs_usuario_id_fk',
      references: {
        table: 'usuarios',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('logs', 'logs_usuario_id_fk');

    await queryInterface.addConstraint('logs', {
      fields: ['usuario_id'],
      type: 'foreign key',
      name: 'logs_ibfk_1',
      references: {
        table: 'usuarios',
        field: 'id'
      },
      onDelete: 'SET DEFAULT',
      onUpdate: 'CASCADE'
    });
  }
};
