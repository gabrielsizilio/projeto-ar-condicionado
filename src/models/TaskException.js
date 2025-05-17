const { Model, DataTypes } = require('sequelize')

class TaskException extends Model {
    static init(sequelize) {
        super.init({
            date: DataTypes.DATEONLY,
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

module.exports = TaskException