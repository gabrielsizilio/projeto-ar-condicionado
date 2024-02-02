const { Model, DataTypes } = require('sequelize')

class Controlador extends Model {
    static init(sequelize) {
        super.init({
            macAddress: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'controladores'
        })
    }

    static associate(models) {
        this.belongsTo(models.Sala, {
            foreignKey: 'sala_id',
            as: 'sala'
        })
    }
}

module.exports = Controlador