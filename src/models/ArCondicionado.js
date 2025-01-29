const { Model, DataTypes } = require('sequelize')

class ArCondicionado extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            pinEmissor: DataTypes.INTEGER
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
        }),
        this.belongsTo(models.Controlador, {
            foreignKey: 'controlador_id',
            as: 'controlador'
        }),
        this.hasOne(models.EstadoAr, {foreignKey: "ar_id", as: "estado"})
    }
}

module.exports = ArCondicionado