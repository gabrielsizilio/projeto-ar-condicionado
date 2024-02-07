const { Model, DataTypes } = require("sequelize")

class Area extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'areas'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Usuario, {
            foreignKey: 'area_id',
            through: 'usuarios_areas',
            as: 'usuarios'
        })
    }
}

module.exports = Area