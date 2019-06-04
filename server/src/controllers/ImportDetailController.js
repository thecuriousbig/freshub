const { ImportDetail } = require('../models')
const { Material } = require('../models')


module.exports = {
  async getImportDetailByID(req, res) {
    // try to get PurchaseOrder By ID
    await ImportDetail.findAll({
      where: {
        ImportID : req.params.id
      },
      include:[{model:Material,as:'Material'}]
    }).then( importdetail => {
      res.json(importdetail)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },
}