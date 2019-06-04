const { MaterialOrder } = require('../models')
const { Manufacturer } = require('../models')
const { Material } = require('../models')
const { MaterialOrderDetail } = require('../models')
module.exports = {
  async createMaterialOrder(req, res) {
    
    await MaterialOrder.create({
      ManufacturerID: req.body.Manufacturer.ID,
      OrderDate: req.body.OrderDate,
      DeliverDate: req.body.DeliverDate,
      Status: 'In Progress'
    }).then( materialorder => {
      var obj = {MaterialOrderID: materialorder.getDataValue('ID'),MaterialID:0,PricePerUnit:0,Amount:0}
      req.body.OrderList.forEach( order => {
        Material.findOne({
          where: {
            ID : order.MaterialID
          }
        }).then( material => {
          obj.MaterialID = material.getDataValue('ID')
          obj.PricePerUnit = order.PricePerUnit
          obj.Amount = order.Amount
          MaterialOrderDetail.create(obj).then( materialorderdetail => {
            console.log('materialorderdetail ==> ', materialorderdetail.get({plain:true}))
          })
        }).catch( err => {
          res.status(404).send('error occured when trying to find material')
        })
      })
      // success
      res.json(materialorder)
    }).catch( err => {
      res.status(500).send('error occured when creating materialorder')
    })
  },
  async getMaterialOrder(req, res) {
    await MaterialOrder.findAll({
      include: [
        {model: Manufacturer, as: 'Manufacturer'}
      ]
    }).then(materialorder => {
      console.log('result : ', materialorder)
      res.json(materialorder)
    }).catch(err => {
      res.status(500).send({
        error: 'error : ' + err
      })
    })
  },

  async getMaterialOrderByID(req, res) {
    await MaterialOrder.findOne({
      where: {
        ID : req.params.id
      },
      include: [
        {model: Manufacturer, as: 'Manufacturer'}
      ]
    }).then( materialorder => {
      console.log('result : ', materialorder.dataValues)
      res.json(materialorder)
    }).catch( err => {
      res.status(500).send({
        error: 'error : ' + err
      })
    })
  },

  async deleteMaterialOrder(req, res) {
    await MaterialOrder.findOne({
      where: {
        ID: req.params.id
      }
    }).then(materialorder => {
      var isDeleteSuccess = 'fail'
      var result = materialorder.destroy()
      if (result) {
        isDeleteSuccess = 'success'
      }
      res.send({ delete: isDeleteSuccess, id: req.params.id })
    }).catch(err => {
      res.status(400).send({
        error: 'error : ' + err
      })
    })
  },

  async updateMaterialOrder(req, res) {
    var obj = req.body
   await MaterialOrder.findOne({
     where:{
       ID:req.params.id
     }
   }).then(materialorder=>{
    materialorder.update(obj).then(mo=>{
      res.send(mo)
    }).catch(err=>{
      res.status(404).send('cant update')
    })
   }).catch(err=>{
    res.status(400).send('Cant find mo')
   })
  }
}
