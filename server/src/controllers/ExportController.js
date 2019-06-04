const { Export } = require('../models')
const { Staff } = require('../models')
const { ExportDetail } = require('../models')
const { PurchaseOrder } = require('../models')
const { Product } = require('../models')
const { Position } = require('../models')
const { User } =require('../models')
module.exports = {
  async createExport (req, res) {
    await Staff.findOne({
      where:{
        ID:req.body.StaffID
      }
    }).then(worker=>{

      var staffid = worker.getPositionID() 
      Position.findOne({
        where:{
          ID:staffid
        }
      }).then(position=>{
        console.log('position ==> ',position.get({plain:true}))
        if(position.getDataValue('Position')=='Employee'){
          PurchaseOrder.findOne({
            where:{
              ID:req.body.PurchaseOrderID
            }
          }).then( po => {
            console.log('purchaseorder ==> ',po.get({plain:true}))
            Export.create({
              StaffID:req.body.StaffID,
              PurchaseOrderID:req.body.PurchaseOrderID,
              DepartureDate:req.body.DepartureDate,
              Reason:req.body.Reason
            }).then( expo => {

              var arr = []
              var obj = { ExportID: expo.getDataValue('ID'), ProductID: 0, Amount: 0 }
              var orderList = req.body.OrderList
              orderList.forEach(order =>{
                Product.findOne({
                  where:{
                    ID:order.ProductID
                  }
                }).then(product=>{
                  obj.ProductID = order.ProductID
                  obj.Amount = order.Amount
                  ExportDetail.create(obj).then(expodetail=>{
                    var amount = product.getDataValue('Amount')
                    Product.update({
                      Amount:amount-order.Amount
                    },{
                      where:{ID:order.ProductID}
                    })
                  }).catch(err=>{
                    res.status(404).send('error while create expo detail')
                  })
                }).catch(err =>{
                  res.status(404).send('error while find product')
                })
              })
              res.send(expo)
            }).catch(err=>{
              res.status(404).send('error while create expo')
            })
          }).catch(err=>{
            res.status(400).send('error while find po')
          })
        }else{
          res.status(400).send('This staff is not permitted')
        }
      }).catch(err=>{
        res.status(400).send('error while find staff')
      })
    })
  },

  async getExport (req, res) {
   await Export.findAll({
     include:[{model:Staff,as:'Staff'},{model:PurchaseOrder,as:'PurchaseOrder',
    include:[{model:User,as:'User'}]},
    ]
   }).then(expo=>{
    console.log('Load Export -> success')
    res.json(expo)
   }).catch(err=>{
     res.status(500).send({
       error:'error : ' + err
     })
   })
  },

  async getExportByID(req, res) {
    await Export.findOne({
      where: {
        ID : req.params.id
      },
      include: [{ model: Staff, as: 'Staff' }, {
        model: PurchaseOrder, as: 'PurchaseOrder',
        include: [{ model: User, as: 'User' }]
      },
      ]
    }).then( expo => {
      console.log('result : ',expo.dataValues)
      res.json(expo)
    }).catch( err => {
      res.status(400).send({
        error: 'object not found'
      })
    })
  },

  async deleteExport(req, res) {
    await Export.findOne({
      where: {
        ID: req.params.id
      }
    }).then(exports => {
      var isDeleteSuccess = 'fail'
      var result = exports.destroy()
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

  async updateExport(req, res) {
    await Export.findOne({
      where: {
        ID : req.params.id
      }
    }).then( ex => {
      PurchaseOrder.findOne({
        where: {
          ID : ex.PurchaseOrderID
        }
      }).then( purchaseorder => {
        purchaseorder.updateAttributes({Status: req.body.Status}).then( update => {
          console.log('update item : ',update.get({plain:true}))
          res.json(update)
        }).catch( err => {
          res.status(500).send('error while ')
        })
      }).carch( err => {
        res.status(500).send('error while findind purchaseorder')
      })
    }).catch( err => {
      res.status(404).send('error while finding export')
    })
  }
}