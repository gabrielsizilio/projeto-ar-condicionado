const { Model, DataTypes } = require('sequelize')

class ArCondicionado extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'ares_condicionados'
        })
    }

    static associate(models) {
        this.belongsTo(models.Modelo, {
            foreignKey: 'modelo_id',
            as: 'modelo'
        }),
        this.belongsTo(models.Sala, {
            foreignKey: 'sala_id',
            as: 'sala'
        })
    }
}

module.exports = ArCondicionado