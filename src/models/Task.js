const { Model, DataTypes } = require('sequelize')

class Task extends Model {
    static init(sequelize) {
        super.init({
            temperatura: DataTypes.INTEGER,
            status: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        }, {
            sequelize,
            tableName: 'task'
        })
    }

    static associate(models) {
        this.belongsToMany(models.ArCondicionado, {
            through: "task_ares_condicionados",
            foreignKey: 'task_id',
            otherKey: "ar_id",
            as: "aresCondicionados"
        });
    }
}

module.exports = Task