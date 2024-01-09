const { Model, DataTypes } = require("sequelize");

class Marca extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize, 
            tableName: 'marcas'   
        })
    }
}

module.exports = Marca