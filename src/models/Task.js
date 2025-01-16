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
        this.belongsToMany(models.ArCondicionado, {
            through: "task_ares_condicionados",
            foreignKey: 'task_id',
            otherKey: "ar_id"
        });
    }
}

module.exports = Task