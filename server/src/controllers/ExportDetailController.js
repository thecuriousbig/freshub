const { ExportDetail } = require('../models')
const { Product } = require('../models')


module.exports = {
  async getExportDetailByID(req, res) {
    // try to get PurchaseOrder By ID
    await ExportDetail.findAll({
      where: {
        ExportID : req.params.id
      },
      include:[{model:Product,as:'Product'}]
    }).then( exportdetail => {
      res.json(exportdetail)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },
}