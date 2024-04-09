'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // CREDENCIAIS
    const credencial = await queryInterface.bulkInsert('credencials', [{
      email: 'adm@mail.com',
      senha: '$2b$12$I07JQ0i8OnyjHQdvlaikpu6FbfphnzGIDx9SqiV5W7T6gLCHWrXCi',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    

    // ROLES
    const adm = await queryInterface.bulkInsert('roles', [{
      nome: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    await queryInterface.bulkInsert('roles', [{
      nome: 'Manutenção',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    await queryInterface.bulkInsert('roles', [{
      nome: 'Padrão',
      createdAt: new Date(),
      updatedAt: new Date()
    }])


    // USUARIO
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Chefão',
      nickname: 'Administrador 007',
      role_id: adm,
      credencial_id: credencial,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('credencials', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
};
