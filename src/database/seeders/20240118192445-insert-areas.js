'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // AREAS
    await queryInterface.bulkInsert('areas', [{
      nome: 'Computação',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Elétrica',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Química',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
