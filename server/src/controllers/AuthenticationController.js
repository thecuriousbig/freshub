const {User} = require('../models')
const {Staff} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
//{User} is every models that created in sequelize
module.exports = {
  //register method : return a res when recieve a req from client
  async register (req,res) {
    try {
      //try creating a req.body and send it in JSON format
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      //if email already exists!
      res.status(400).send({
        error: 'This email or username is already taken'
      })
    }
  },
  async login (req, res) {
    try {
      //grap email and password from req.body
      const {username, password} = req.body
      //find the email in db where email is the same that login
      /* SELECT * FROM User WHERE UserName == username*/
      const user = await User.findOne({
        where: {
          UserName: username
        }
      })
      console.log('user', user.toJSON())
      //if login's email is not exists in db
      if (!user) {
        return res.status(403).send({
          error: 'This username is invalid'
        })
      }
      //check password if password is equal  to user.Password in db
      const isPasswordValid = password === user.Password
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Incorrect password'
        })
      }
      //send JSON back to client
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })

    } catch (err) {
      //if there is an error
      res.status(500).send({
        error: 'An error has occured when trying to login'
      })
    }
  },

  async staffRegister(req, res) {
    try {
      //try creating a req.body and send it in JSON format
      const staffRegis = await Staff.create(req.body)
      res.send(staffRegis.toJSON())
    } catch (err) {
      //if email already exists!
      res.status(400).send({
        error: 'This email or username is already taken'
      })
    }
  },

  async staffLogin (req, res) {
    try {
      //grap req.body in field email and password
      const {email, password} = req.body
      //find one email in database if this email is exist in database
      /* SELECT * FROM Staff WHERE Email == email*/
      const staff = await Staff.findOne({
        where : {
          Email : email
        }
      })
      //Check result of finding email in database
      if (!staff) {
        return res.status(403).send({
          error: 'This email address is  invalid'
        })
      }
      console.log('staff',staff.toJSON())
      //if email is exist in database then checking a password
      const isPasswordValid = password === staff.Password
      if (!isPasswordValid) {
        return res.status(403).send({
          error : 'Incorrect password'
        })
      }
      const staffJson = staff.toJSON()
      res.send({
        staff: staffJson,
        token: jwtSignUser(staffJson)
      })
    } catch (err) {
      //if there is an error
      res.status(500).send({
        error: 'An error has occured when trying to login'
      })
    }
    
  }
}