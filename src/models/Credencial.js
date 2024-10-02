const { Model, DataTypes } = require('sequelize')

class Credencial extends Model {
    static init(sequelize) {
        super.init({
            email: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'credencials',
            paranoid: true
        })
    }

    static associate(models) {
        this.hasOne(models.Usuario, {
            foreignKey: 'credencial_id',
            as: 'usuario'
        })

    }
}

module.exports = Credencial