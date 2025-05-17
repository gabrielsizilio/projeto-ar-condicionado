const { Model, DataTypes } = require('sequelize')

class TaskSingle extends Model {
    static init(sequelize) {
        super.init({
            date: DataTypes.DATE,
        }, {
            sequelize,
            tableName: 'task_single'
        })
    }

    static associate(models) {
        this.belongsTo(models.Task, {
            foreignKey: 'task_id',
            as: "task"
        });
    }
}

module.exports = TaskSingle