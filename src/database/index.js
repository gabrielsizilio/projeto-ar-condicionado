const Sequelize = require('sequelize')
const configDB = require('../config/database')
const Credencial = require('../models/Credencial')
const Usuario = require('../models/Usuario')

const connection = new Sequelize(configDB)

Credencial.init(connection)
Usuario.init(connection)

Credencial.associate(connection.models)
Usuario.associate(connection.models)

module.exports = connection