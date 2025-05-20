const { Model, DataTypes } = require('sequelize')

class TaskAr extends Model {
    static init(sequelize) {
        super.init({
            task_id: DataTypes.INTEGER,
            ar_id: DataTypes.INTEGER,
            temperatura: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'task_ares_condicionados'
        })
    }
}

module.exports = TaskAr