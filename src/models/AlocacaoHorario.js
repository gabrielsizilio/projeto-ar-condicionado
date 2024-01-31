const { Model, DataTypes } = require('sequelize')

class AlocacaoHorario extends Model {
    static init(sequelize) {
        super.init({

        }, {
            sequelize,
            tableName: 'alocacao_horarios'
        })
    }

    static associate(models) {
        this.belongsTo(models.Sala, {
            foreignKey: 'sala_id',
            as: 'sala'
        }),
        this.belongsTo(models.Horario, {
            foreignKey:'horario_id',
            as: 'horario'
        }),
        this.belongsTo(models.Semana, {
            foreignKey: 'semana_id',
            as: 'semana'
        }),
        this.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        }) 
    }
}

module.exports = AlocacaoHorario