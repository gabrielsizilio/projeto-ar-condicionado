const { Model, DataTypes } = require('sequelize')

class Task extends Model {
    static init(sequelize) {
        super.init({
            dateTime: DataTypes.DATE,
            status: DataTypes.ENUM("pending", "completed")
            
        }, {
            sequelize,
            tableName: 'tasks'
        })
    }

    static associate(models) {
        this.belongsTo(models.ArCondicionado, {
            foreignKey: 'ar_id',
            as: 'arCondicionado'
        });
        this.belongsTo(models.Temperatura, {
            foreignKey: 'temperatura_id',
            as: 'temperatura'
        });
    }
}

module.exports = Task