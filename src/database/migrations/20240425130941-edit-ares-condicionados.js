'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ares_condicionados', 'pinEmissor', { 
        type: Sequelize.INTEGER,
        allowNull: false,
     });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ares_condicionados', 'pinEmissor');
  }
};
