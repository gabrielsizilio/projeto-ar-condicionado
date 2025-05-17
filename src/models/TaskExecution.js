const { Model, DataTypes } = require('sequelize')

class TaskExecution extends Model {
    static init(sequelize) {
        super.init({
            status: DataTypes.ENUM("PENDING", "RUNNING", "COMPLETED", "FAILED", "CANCELLED"),
            rason: DataTypes.TEXT
        }, {
            sequelize,
            tableName: 'task_exception'
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