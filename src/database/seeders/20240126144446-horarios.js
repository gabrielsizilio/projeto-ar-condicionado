'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '07:20',
      horario_fim: '09:00',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '09:10',
      horario_fim: '10:50',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '11:00',
      horario_fim: '12:40',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '13:20',
      horario_fim: '15:00',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '15:10',
      horario_fim: '16:50',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '17:00',
      horario_fim: '18:50',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '19:20',
      horario_fim: '21:00',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('horarios', [{
      horario_ini: '21:10',
      horario_fim: '22:40',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('horarios', null, {})
  }
};
