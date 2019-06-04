const { WorkOrder } = require('../models')
const { Staff } = require('../models')
const { Duty } = require('../models')
const { Position } = require('../models')
const { PurchaseOrder } = require('../models')
const { MaterialOrder } = require('../models')
const { WorkOrderImportExport } = require('../models')
const { WorkOrderPackage } = require('../models')
const { Product } = require('../models')

const config = require('../config/config')

//{User} is every models that created in sequelize
module.exports = {
  //createWorkOrder method : create workorder in database
  async createWorkOrder(req, res) {
    //try creating a req.body and send it in JSON format
    //this code refers to sql statement code like : INSERT INTO workOrder VALUES req.body
    await Staff.findOne({
      where: {
        ID: req.body.ManagerID
      }
    }).then(manager => {
      // check if this staff is manager ??
      var positionID = manager.getPositionID()
      Position.findOne({
        where: {
          ID: positionID
        }
      }).then(position => {
        // check position equal to 2 (manager)
        if (position.getDataValue('Position') != 'Employee') {
          Staff.findOne({
            where: {
              ID: req.body.StaffID
            }
          }).then(() => {
            // check DutyName
            Duty.findOne({
              where: {
                DutyName: req.body.DutyName
              }
            }).then(duty => {
              var DutyID = duty.getDataValue('DutyID')
              if (DutyID == 1) {
                MaterialOrder.findOne({
                  where: {
                    ID: req.body.OrderID
                  }
                }).then(materialorder => {
                  console.log('materialorder ==> ',materialorder.get({plain:true}))
                  WorkOrder.create({
                    StaffID: req.body.StaffID,
                    ManagerID: req.body.ManagerID,
                    DutyID: DutyID,
                    OrderDateTime: req.body.OrderDateTime,
                    DueDateTime: req.body.DueDateTime,
                    Status: 'In Progress'
                  }).then(workorder => {
                    console.log('getter : ', workorder.getDataValue('ID'))
                    WorkOrderImportExport.create({
                      WorkOrderID: workorder.getDataValue('ID'),
                      MaterialOrderID: req.body.OrderID,
                    }).then(workorderimportexport => {
                      console.log('workorderimportexport ==> ',workorderimportexport.get({plain:true}))
                      res.json(workorder)
                    }).catch(err => {
                      res.status(500).send('error while creating workorderimportexport where OrderID = 1')
                    })
                  }).catch(err => {
                    res.status(500).send('error while creating workorder where OrderID = 1')
                  })
                }).catch(err => {
                  res.status(404).send('error while finding materialOrder')
                })
              } else if (DutyID == 2) {
                PurchaseOrder.findOne({
                  where: {
                    ID: req.body.OrderID
                  }
                }).then(purchaseorder => {
                  WorkOrder.create({
                    StaffID: req.body.StaffID,
                    ManagerID: req.body.ManagerID,
                    DutyID: DutyID,
                    OrderDateTime: req.body.OrderDateTime,
                    DueDateTime: req.body.DueDateTime,
                    Status: 'In Progress'
                  }).then(workorder => {
                    WorkOrderImportExport.create({
                      WorkOrderID: workorder.getDataValue('ID'),
                      PurchaseOrderID: req.body.OrderID
                    }).then(workorderimportexport => {
                      console.log('workorderimportexport ==> ',workorderimportexport.get({plain:true}))
                      res.json(workorder)
                    }).catch(err => {
                      res.status(500).send('error while creating workorderimportexport where OrderID = 2')
                    })
                  }).catch(err => {
                    res.status(500).send('error while creating workorder where OrderID = 2')
                  })
                }).catch(err => {
                  res.status(404).send('error while finding purchaseorder')
                })
              } else {
                WorkOrder.create({
                  StaffID: req.body.StaffID,
                  ManagerID: req.body.ManagerID,
                  DutyID: DutyID,
                  OrderDateTime: req.body.OrderDateTime,
                  DueDateTime: req.body.DueDateTime,
                  Status: 'In Progress'
                }).then( workorder => {
                  console.log('workorder ==> ', workorder.get({plain:true}))
                  var arr = []
                  var obj = { WorkOrderID: workorder.getDataValue('ID'), ProductID: 0, Amount: 0 }
                  var orderList = req.body.OrderList
                  console.log('orderList', orderList)
                  orderList.forEach(order => { 
                    obj.ProductID = order.ProductID
                    obj.Amount = order.Amount
                    WorkOrderPackage.create(obj).then( workorderpackage => {
                      console.log('workorderpackage => ', workorderpackage.get({plain:true}))
                      // arr.push(workorderpackage.get({plain:true}))
                    }).catch( err => {
                      res.status(404).send('error while creating workorderpackage')
                    })
                  })
                  res.send(workorder)
                })
              }
            }).catch(err => {
              res.status(404).send('error while finding duty')
            })
          }).catch(err => {
            res.status(404).send('error while finding staff')
          })
        } else {
          res.status(400).send('This Staff is not permitted')
        }
      }).catch(err => {
        res.status(404).send('error while finding position')
      })
    }).catch(err => {
      res.status(404).send('error while finding manager')
    })
  },

  
  async getWorkOrder(req, res) {
    // try to get all workOrder
    await WorkOrder.findAll({
      include : [
        {model: Staff, as: 'Manager'},{model: Staff, as: 'Staff'},{model: Duty, as: 'Duty'}
      ]
    }).then( workorder => {
      console.log('Load WorkOrder -> success')
      res.json(workorder)
    }).catch( err => {
      res.status(500).send({
        error : 'error : ' + err
      })
    })
  },

  async getWorkOrderByID(req, res) {
    //try to get workOrder by req.params.id
    await WorkOrder.findOne({
      where: {
        ID : req.params.id
      },
      include : [
        { model: Staff, as: 'Manager' }, { model: Staff, as: 'Staff' }, { model: Duty, as: 'Duty' }
      ]
    }).then( workorder => {
      console.log('result : ', workorder.dataValues)
      res.json(workorder)
    }).catch( err => {
      res.status(400).send({
        error: 'object not found'
      })
    })
     
  },

  async deleteWorkOrder(req, res) {
    // try to delete workOrder where :id parse from req.params.id
    await WorkOrder.findOne({
      where: {
        ID: req.params.id
      }
    }).then(workorder => {
      var isDeleteSuccess = 'fail'
      var result = workorder.destroy()
      if (result) {
        isDeleteSuccess = 'success'
      }
      res.send({delete : isDeleteSuccess,id : req.params.id})
    }).catch(err => {
      res.status(400).send({
        error: 'error : ' + err
      })
    })
  },

  async updateWorkOrder(req, res) {
    var obj = req.body.Status
   await WorkOrder.findOne({
     where:{
       ID:req.params.id
     }
   }).then(workorder=>{
    workorder.updateAttributes({Status: obj}).then(wo=>{
      console.log('asdasdasdasdasd')
      res.send(wo)
    }).catch(err=>{
      res.status(404).send('cant update ')
    })
   }).catch(err=>{
    res.status(400).send('Cant find wo')
   })
  }
}
