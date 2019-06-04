const { PurchaseOrderDetail } = require('../models')
const { Product } = require('../models')

module.exports = {
  async getPurchaseOrderDetailByID(req, res) {
    // try to get PurchaseOrder By ID
    await PurchaseOrderDetail.findAll({
      where: {
        PurchaseOrderID : req.params.id
      },
      include:[{model:Product,as:'Product'}]
    }).then( purchaseorderdetail => {
      res.json(purchaseorderdetail)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },
}
