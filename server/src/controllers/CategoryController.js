const { Category } = require('../models')

module.exports = {

  
  async getCategory(req, res) {
    await Category.findAll({}).then(category => {
      res.json(category)
    }).catch(err => {
      res.status(500).send({
        error: 'error : ' + err
      })
    })
  }
}