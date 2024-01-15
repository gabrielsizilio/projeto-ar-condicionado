const { Model, DataTypes } = require('sequelize')

class ArCondicionado extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            modelo: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'ares_condicionados'
        })
    }

    static associate(models) {
        this.belongsTo(models.Marca, {
            foreignKey: 'marca_id',
            as: 'marca'
        })
    }
}

module.exports = ArCondicionado