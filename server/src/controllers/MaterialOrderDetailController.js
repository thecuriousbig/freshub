const { MaterialOrderDetail } = require('../models')
const { Material } = require('../models')


module.exports = {
  async getMaterialOrderDetailByID(req, res) {
    // try to get PurchaseOrder By ID
    await MaterialOrderDetail.findAll({
      where: {
        MaterialOrderID : req.params.id
      },
      include:[{model:Material,as:'Material'}]
    }).then( materialorderdetail => {
      res.json(materialorderdetail)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },
}