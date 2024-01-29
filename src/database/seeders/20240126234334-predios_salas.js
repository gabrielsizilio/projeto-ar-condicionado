'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const predio1 = await queryInterface.bulkInsert('predios', [{
      nome: 'Edificações',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    const predio2 = await queryInterface.bulkInsert('predios', [{
      nome: 'Computação',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    const predio3 = await queryInterface.bulkInsert('predios', [{
      nome: 'Administrativo',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    
    await queryInterface.bulkInsert('salas', [{
      nome: 'Make Space',
      predio_id: predio1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('salas', [{
      nome: 'Sala 12',
      predio_id: predio2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('salas', [{
      nome: 'Biblioteca',
      predio_id: predio3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('predios', null, {});
    await queryInterface.bulkDelete('salas', null, {});

  }
};
