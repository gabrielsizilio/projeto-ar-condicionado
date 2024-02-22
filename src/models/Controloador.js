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
        this.hasMany(models.ArCondicionado, {
            foreignKey: 'controlador_id',
            as: 'arCondicionado'
        })
    }
}

module.exports = Controlador