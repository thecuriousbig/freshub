//fs (file system) is library in node.js
//sequelize is an ORM (Object Relational Manager) which help us access a relational database with no use of dialect 
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

//define a sequelize by using a property that set in config.js
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

//fs will read all the file in models folder except index.js
//and add those file (each file contain model which is using in db) in db object
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })
  
  db.sequelize = sequelize
  db.Sequelize = Sequelize

module.exports = db
