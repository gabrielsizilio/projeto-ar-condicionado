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
            through: 'usuarios_areas'
        })
    }
}

module.exports = Area