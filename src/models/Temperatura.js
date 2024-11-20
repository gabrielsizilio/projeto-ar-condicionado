const { Model, DataTypes } = require('sequelize')

class Temperatura extends Model {
    static init(sequelize) {
        super.init({
            temp16: DataTypes.TEXT,
            temp17: DataTypes.TEXT,
            temp18: DataTypes.TEXT,
            temp19: DataTypes.TEXT,
            temp20: DataTypes.TEXT,
            temp21: DataTypes.TEXT,
            temp22: DataTypes.TEXT,
            temp23: DataTypes.TEXT,
            temp24: DataTypes.TEXT,
            temp25: DataTypes.TEXT,
            off: DataTypes.TEXT
        }, {
            sequelize,
            tableName: 'temperaturas'
        })
    }


    static associate(models) {
        this.belongsTo(models.Modelo, {
            foreignKey: 'modelo_id',
            as: 'modelo'
        }),
        this.hasOne(models.estado_ar,{
            foreignKey: 'temperatura_id',
            as:'estado_ars'
        })
    }
}

module.exports = Temperatura