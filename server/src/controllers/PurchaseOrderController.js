const { PurchaseOrder } = require('../models')
const { PurchaseOrderDetail } = require('../models')
const { PaymentMethod } = require('../models')
const { Product } = require('../models')
const { User } = require('../models')

module.exports = {
  async createPurchaseOrder(req, res) {
   
    await User.findOne({
      where: {
        Email: req.body.Email
      }
    }).then( user => {
      PurchaseOrder.create({
        UserID: user.getDataValue('ID'),
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        TelNo: req.body.TelNo,
        OrderDate: req.body.OrderDate,
        DeliverDate: req.body.DeliverDate,
        PaymentID: req.body.PaymentID,
        ShippingAddress: req.body.ShippingAddress,
        Status: 'In Progress'
      }).then( purchaseorder => {
        var obj = {PurchaseOrderID: purchaseorder.getDataValue('ID'),ProductID:0,Amount:0,Cost:0}
        req.body.CartList.forEach( cart => {
          Product.findOne({
            where:{ID:cart.ProductID}
          }).then(product=>{
            obj.ProductID = cart.ProductID
            obj.Amount = cart.Amount
            obj.Cost = (cart.Amount*product.Price)
            PurchaseOrderDetail.create(obj).then( purchaseorderdetail => {
              console.log('purchaseorderdetail ==> : ', purchaseorderdetail.get({plain:true}))
            }).catch( err => {
              res.status(500).send('error occured when trying to create purchaseorderdetail')
            })
          })
         })
        //success
        res.json(purchaseorder)
      }).catch( err => {
        res.status(500).send('error occured when trying to create purchaseorder')
      })
    }).catch( err => {
      res.status(404).send('error occured when trying to find User')
    })
  },
  async getPurchaseOrder(req, res) {
    // try to get all PurchaseOrder
    await PurchaseOrder.findAll({
      include: [
        {model: User, as: 'User'},
        {model: PaymentMethod, as: 'PaymentMethod'}
      ]
    }).then(purchaseorder => {
      console.log('result : ', purchaseorder)
      res.json(purchaseorder)
    }).catch(err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },

  async getPurchaseOrderByID(req, res) {
    // try to get PurchaseOrder By ID
    await PurchaseOrder.findOne({
      where: {
        ID : req.params.id
      }
    }).then( purchaseorder => {
      console.log('result : ', purchaseorder.dataValues)
      res.json(purchaseorder)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },

  async getPurchaseOrderByUserID(req, res) {
    // try to get PurchaseOrder By ID
    await PurchaseOrder.findAll({
      where: {
        UserID : req.params.userId
      }
    }).then( purchaseorder => {
      res.json(purchaseorder)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },

  async deletePurchaseOrder(req, res) {
    await PurchaseOrder.findOne({
      where: {
        ID: req.params.id
      }
    }).then(purchaseorder => {
      var isDeleteSuccess = 'fail'
      var result = purchaseorder.destroy()
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

  async updatePurchaseOrder(req, res) {
    var obj = req.body
   await PurchaseOrder.findOne({
     where:{
       ID:req.params.id
     }
   }).then(purchaseorder=>{
    purchaseorder.update(obj).then(po=>{
      res.send(po)
    }).catch(err=>{
      res.status(404).send('cant update')
    })
   }).catch(err=>{
    res.status(400).send('Cant find po')
   })
  }
}
