const Sequelize = require('sequelize')
const configDB = require('../config/database')
const Credencial = require('../models/Credencial')
const Usuario = require('../models/Usuario')
const Predio = require('../models/Predio')
const Sala = require('../models/Sala')
const Marca = require('../models/Marca')
const Modelo = require('../models/Modelo')
const ArCondicionado = require('../models/ArCondicionado')
const Temperatura = require('../models/Temperatura')
const Semana = require('../models/Semana')
const Horario = require('../models/Horario')
const AlocacaoHorario = require('../models/AlocacaoHorario')
const Log = require('../models/Log')

const connection = new Sequelize(configDB);

const authenticateConnection = async () => {
    try {
        await connection.authenticate();
        console.log('>> Conectado ao banco de dados com sucesso');
    } catch (error) {
        console.error(`!> Erro ao conectar-se ao banco de dados: ${error}`);
    }
}

authenticateConnection();

Credencial.init(connection)
Usuario.init(connection)
Predio.init(connection)
Sala.init(connection)
Marca.init(connection)
Modelo.init(connection)
ArCondicionado.init(connection)
Temperatura.init(connection)
Semana.init(connection)
Horario.init(connection)
AlocacaoHorario.init(connection)
Log.init(connection)


Credencial.associate(connection.models)
Usuario.associate(connection.models)
Predio.associate(connection.models)
Sala.associate(connection.models)
Marca.associate(connection.models)
Modelo.associate(connection.models)
ArCondicionado.associate(connection.models)
Temperatura.associate(connection.models)
Semana.associate(connection.models)
Horario.associate(connection.models)
AlocacaoHorario.associate(connection.models)
Log.associate(connection.models)

module.exports = connection