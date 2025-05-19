const { Model, DataTypes } = require('sequelize')

class TaskExecution extends Model {
    static init(sequelize) {
        super.init({
            task_id: DataTypes.INTEGER,
            scheduled_for: DataTypes.DATE,
            status: DataTypes.ENUM('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED')
        }, {
            sequelize,
            tableName: 'task_execution'
        })
    }

    static associate(models) {
        this.belongsTo(models.Task, {
            foreignKey: 'task_id',
            as: "task"
        });
    }
}

module.exports = TaskExecution