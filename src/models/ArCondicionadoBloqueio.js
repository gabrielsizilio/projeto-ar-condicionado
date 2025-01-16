const { Model, DataTypes } = require('sequelize')

class ArCondicionadoBloqueio extends Model {
    static init(sequelize) {
        super.init({
            motivo: DataTypes.STRING,
            bloqueado_em: DataTypes.DATE,
            desbloqueado_em: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'ares_condicionados_bloqueios'
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        }),
        this.belongsTo(models.ArCondicionado, {
            foreignKey: 'ar_condicionado_id',
            as: 'arCondicionado'
        })
    }
}

module.exports = ArCondicionadoBloqueio