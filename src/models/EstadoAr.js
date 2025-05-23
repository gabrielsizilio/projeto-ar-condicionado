const { Model, DataTypes } = require('sequelize')

class EstadoAr extends Model {
    static init(sequelize) {
        super.init({
            ar_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: { model: "ar_condicionados", key: "id" },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            temp: DataTypes.ENUM("off", "temp16", "temp17", "temp18", "temp19", "temp20", "temp21", "temp22", "temp23", "temp24", "temp25")
        }, {
            sequelize,
            tableName: 'estado_ares'
        })
    }

    static associate(models) {
        this.belongsTo(models.ArCondicionado, {
            foreignKey: 'ar_id',
            as: 'arCondicionado'
        })
    }
}

module.exports = EstadoAr