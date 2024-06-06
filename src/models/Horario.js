const { Model, DataTypes } = require('sequelize')

class Horario extends Model {
    static init(sequelize) {
        super.init({
            horario_ini: DataTypes.TIME,
            horario_fim: DataTypes.TIME
        }, {
            sequelize,
            tableName: 'horarios'
        })
    }

    static associate(models) {
        this.hasMany(models.AlocacaoHorario, {
            foreignKey: 'horario_id',
            as: 'alocacoes'
        })
    }
}

module.exports = Horario