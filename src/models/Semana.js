const { Model, DataTypes } = require('sequelize')

class Semana extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'semana'
        })
    }

    static associate(models) {
        this.hasMany(models.AlocacaoHorario, {
            foreignKey: 'semana_id',
            as: 'alocacoes'
        })
    }
}

module.exports = Semana