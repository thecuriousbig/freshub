const { Manufacturer } = require('../models')



module.exports = {
  async getManufacturer(req, res) {
    // try to get PurchaseOrder By ID
    await Manufacturer.findAll({}).then( manu => {
      res.json(manu)
    }).catch(err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },

  async getManufacturerByID(req, res) {
    // try to get PurchaseOrder By ID
    await Manufacturer.findOne({
      where: {
        ID: req.params.id
      },
    }).then(manu => {
      res.json(manu)
    }).catch(err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },
}