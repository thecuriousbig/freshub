const { PaymentMethod } = require('../models')

module.exports = {
  async getPaymentMethod(req, res) {
    // try to get PurchaseOrder By ID
    await PaymentMethod.findAll({}).then( paymentmethod => {
      res.json(paymentmethod)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },
  async getPaymentMethodByID(req, res) {
    // try to get PurchaseOrder By ID
    await PaymentMethod.findOne({
      where: {
        ID : req.params.id
      }
    }).then( paymentmethod => {
      res.json(paymentmethod)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },
}
