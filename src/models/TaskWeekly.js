const { Model, DataTypes } = require('sequelize')

class TaskWeekly extends Model {
    static init(sequelize) {
        super.init({
            task_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            weekday: DataTypes.INTEGER,
            time: DataTypes.TIME,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
        }, {
            sequelize,
            tableName: 'task_weekly'
        })
    }

    static associate(models) {
        this.belongsTo(models.Task, {
            foreignKey: 'task_id',
            as: "task"
        });
    }
}

module.exports = TaskWeekly