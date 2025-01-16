const { Model, DataTypes } = require('sequelize')

class TaskAr extends Model {
    static init(sequelize) {
        super.init({
            temperatura: DataTypes.INTEGER,
        }, {
            sequelize,
            tableName: 'task_ares_condicionados'
        })
    }
}

module.exports = TaskAr