'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // ROLE MAKER
    const roleMaker = await queryInterface.bulkInsert('roles', [{
      nome: 'Maker',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);


    // ROLES SALAS
    await queryInterface.bulkInsert('roles_salas', [{
      role_id: roleMaker,
      sala_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('roles_salas', null, {});
  }
};
