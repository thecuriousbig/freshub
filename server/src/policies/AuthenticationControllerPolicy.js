const Joi = require('joi')
//Joi is Object schema description language and validator for JavaScript objects.
//learn more at : https://github.com/hapijs/joi
module.exports = {
  register (req, res, next) {
    const schema = {
        //use regex for declare a format of password should be string
        //and have length between 6 and 32 character 
      UserName: Joi.string().alphanum().min(4).max(30).required(),
      Email: Joi.string().max(40).email().required(),
      Password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,32}$')),
      FirstName: Joi.string().max(30).required(),
      LastName: Joi.string().max(30).required(),
      Address: Joi.string().required(),
      TelNo: Joi.string().min(4).max(10).required()
    }
    //Joi validating the req.body by using schema that provide at the top
    // which is regex for typing a email and password when registration
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      //check the error and the key of the error
      switch (error.details[0].context.key) {
        case 'UserName':
          res.status(400).send({
            error: 'This username is already taken'
          })
        case 'Email': 
          res.status(400).send({
            error: 'This email address is not valid'
          })
          break
        case 'Password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It mush contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must have length between 6 characters and 32 characters.
              `
          })
          break
        case 'FirstName':
          res.status(400).send({
            error: 'Missing value: FirstName'
          })
          break
        case 'LastName':
          res.status(400).send({
            error: 'Missing value: LastName'
          })
          break
        case 'Address':
          res.status(400).send({
            error: 'Missing value: Address'
          })
          break
        case 'TelNo':
          res.status(400).send({
            error: 'Missing or Invalid value: TelNo'
          })
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      //next() is function to tell a caller call a next agrument
      next()
    }
  }
}