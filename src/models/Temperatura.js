const { Model, DataTypes } = require('sequelize')

class Temperatura extends Model {
    static init(sequelize) {
        super.init({
            temp16: DataTypes.STRING,
            temp17: DataTypes.STRING,
            temp18: DataTypes.STRING,
            temp19: DataTypes.STRING,
            temp20: DataTypes.STRING,
            temp21: DataTypes.STRING,
            temp22: DataTypes.STRING,
            temp23: DataTypes.STRING,
            temp24: DataTypes.STRING,
            temp25: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'temperaturas'
        })
    }


    static associate(models) {
        this.belongsTo(models.Modelo, {
            foreignKey: 'modelo_id',
            as: 'modelo'
        })
    }
}

module.exports = Temperatura