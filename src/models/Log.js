const { Model, DataTypes } = require('sequelize')

class Log extends Model {
    static init(sequelize) {
        super.init({
            descricao: DataTypes.TEXT,
        }, {
            sequelize,
            tableName: 'logs'
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        })
    }
}

module.exports = Log