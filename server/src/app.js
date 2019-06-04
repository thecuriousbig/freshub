//Use express for implementing server side
//body-parser for parsing a req by using req.body
//cors let user gain a permission to access selected resources from a server on a different domain(http)//morgan is http request logger for node.js
//import sequelize from index.js in ./models which contains all model for database  
const express = require('express')
const bodyParser = require('body-parser')    
const cors = require('cors')    
const morgan = require('morgan')    
const {sequelize} = require('./models')    
const config = require('./config/config')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//routes for http-request
require('./routes')(app)  

//log if sequelize is completely sync up to the server
// *** if want to drop all table and data in db parse {force:true} as a parameter in sequelize.sync() ***
sequelize.sync({force:false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })

