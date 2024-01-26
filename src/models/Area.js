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
}