const Sequelize = require('sequelize')
const configDB = require('../config/database')
const Credencial = require('../models/Credencial')
const Usuario = require('../models/Usuario')
const Marca = require('../models/Marca')
const ArCondicionado = require('../models/ArCondicionado')

const connection = new Sequelize(configDB);

Credencial.init(connection)
Usuario.init(connection)
Marca.init(connection)
ArCondicionado.init(connection)

Credencial.associate(connection.models)
Usuario.associate(connection.models)
ArCondicionado.associate(connection.models)

module.exports = connection