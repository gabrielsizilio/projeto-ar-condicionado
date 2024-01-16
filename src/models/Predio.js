const { Model, DataTypes } = require('sequelize')

class Predio extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'predios'
        })
    }

    static associate(models) {
        this.hasMany(models.Sala, {
            foreignKey: 'predio_id',
            as: 'salas'
        })
    }
}

module.exports = Predio