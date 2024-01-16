const { Model, DataTypes } = require('sequelize')

class Modelo extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'modelos'
        })
    }

    static associate(models) {
        this.belongsTo(models.Marca, {
            foreignKey: 'marca_id',
            as: 'marca'
        }),
        this.hasMany(models.ArCondicionado, {
            foreignKey: 'modelo_id',
            as: 'ares_condicionados'
        })
    }
}

module.exports = Modelo