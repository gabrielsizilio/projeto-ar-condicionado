'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alocacao_horarios', [{
      sala_id: '1',
      horario_id: '1',
      semana_id: '1',
      usuario_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('alocacao_horarios', [{
      sala_id: '1',
      horario_id: '2',
      semana_id: '2',
      usuario_id: '3',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('alocacao_horarios', [{
      sala_id: '1',
      horario_id: '5',
      semana_id: '2',
      usuario_id: '4',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('alocacao_horarios', [{
      sala_id: '1',
      horario_id: '6',
      semana_id: '3',
      usuario_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alocacao_horarios', null, {})
  }
};
