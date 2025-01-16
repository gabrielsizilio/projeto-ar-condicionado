'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ares_condicionados_bloqueios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motivo: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      ar_condicionado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ares_condicionados',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bloqueado_em: {
        allowNull: false,
        type: Sequelize.DATE
      },
      desbloqueado_em: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ares_condicionados_bloqueios');
  }
};
