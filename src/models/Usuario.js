const { Model, DataTypes } = require('sequelize')

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            nickname: DataTypes.STRING,
            tipo: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'usuarios'
        })
    }

    static associate(models) {
        this.belongsTo(models.Credencial, {
            foreignKey: 'credencial_id',
            as: 'credencial'
        }),
        this.hasOne(models.AlocacaoHorario, {
            foreignKey: 'usuario_id',
            as: 'alocacoes'
        }),
        this.belongsToMany(models.Area, {
            foreignKey: 'usuario_id',
            through: 'usuarios_areas',
            as: 'areas'
        })
    }
}

module.exports = Usuario