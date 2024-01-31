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

    static associate(models) {
        this.hasMany(models.Modelo, {
            foreignKey: 'marca_id',
            as: 'modelos'
        })
    }
}

module.exports = Marca