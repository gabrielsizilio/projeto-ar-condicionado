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
}

module.exports = Predio