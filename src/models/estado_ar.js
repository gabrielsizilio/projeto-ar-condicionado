'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estado_ar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Sala, {
        foreignKey: 'estado_ar_id',
        as:'estado_ars'
      }),
      this.belongsTo(models.Usuario,{
        foreignKey: 'estado_ar_id',
        as:'estado_ars'
      }),
      this.belongsTo(models.Temperatura, {
        foreignKey: 'estado_ar_id',
        as:'estado_ars'
      })
    }
  }
  estado_ar.init({
    sala_id: DataTypes.INTEGER,
    temperatura_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'estado_ar',
  });
  return estado_ar;
};