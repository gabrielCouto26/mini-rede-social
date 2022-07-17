const config = require('./config')
const Sequelize = require('sequelize')
const connection = new Sequelize(config)

module.exports = connection;