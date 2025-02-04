const { Model, DataTypes } = require('sequelize')

class Sala extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'salas'
        })
    }

    static associate(models) {
        this.belongsTo(models.Predio, {
            foreignKey: 'predio_id',
            as: 'predio'
        }),
            this.hasMany(models.ArCondicionado, {
                foreignKey: 'sala_id',
                as: 'ares_condicionados'
            }),
            this.hasMany(models.AlocacaoHorario, {
                foreignKey: 'sala_id',
                as: 'alocacoes'
            }),
            this.belongsToMany(models.Role, {
                foreignKey: 'sala_id',
                through: 'roles_salas',
                as: 'roles'
            })
    }
}

module.exports = Sala