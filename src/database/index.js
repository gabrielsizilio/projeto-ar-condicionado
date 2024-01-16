const Sequelize = require('sequelize')
const configDB = require('../config/database')
const Credencial = require('../models/Credencial')
const Usuario = require('../models/Usuario')
const Marca = require('../models/Marca')
const Modelo = require('../models/Modelo')
const ArCondicionado = require('../models/ArCondicionado')
const Predio = require('../models/Predio')
const Sala = require('../models/Sala')

const connection = new Sequelize(configDB);

Credencial.init(connection)
Usuario.init(connection)
Marca.init(connection)
Modelo.init(connection)
ArCondicionado.init(connection)
Predio.init(connection)
Sala.init(connection)

Credencial.associate(connection.models)
Usuario.associate(connection.models)
Marca.associate(connection.models)
Modelo.associate(connection.models)
ArCondicionado.associate(connection.models)
Predio.associate(connection.models)
Sala.associate(connection.models)

module.exports = connection