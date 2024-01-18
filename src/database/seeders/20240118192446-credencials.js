'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('credencials', [{
      email: 'manutencao@mail.com',
      senha: '$2b$12$I07JQ0i8OnyjHQdvlaikpu6FbfphnzGIDx9SqiV5W7T6gLCHWrXCi',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('credencials', null, {});

  }
};
