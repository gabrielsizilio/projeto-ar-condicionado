const Sequelize = require('sequelize')
const configDB = require('../config/database')

const connection = new Sequelize(configDB)

module.exports = connection