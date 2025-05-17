const { Model, DataTypes } = require('sequelize')

class TaskSingle extends Model {
    static init(sequelize) {
        super.init({
            task_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
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