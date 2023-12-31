const { Model, DataTypes } = require('sequelize')

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'usuarios'
        })
    }

    static associate(models) {
        this.belongsTo(models.Credencial, {
            foreignKey: 'credencial_id',
            as: 'credencial'
        })
    }
}

module.exports = Usuario