//this file config a server property such as port , database , etc
const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {
  port: process.env.PORT || 8082,
  db: {
    database: 'freshub',
    user: 'root',
    password: null,
    options: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      dialect: 'mysql',
      port: 3306,
      host: '127.0.0.1',
      operatorsAliases: Op,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}