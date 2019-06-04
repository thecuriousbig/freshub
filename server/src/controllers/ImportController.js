const { Import } = require('../models')
const { Staff } = require('../models')
const { MaterialOrder } = require('../models')
const { Material } = require('../models')
const { ImportDetail } = require('../models')
const { Manufacturer } = require('../models')

module.exports = {
  async createImport(req, res) {
    await Staff.findOne({
      where: {
        ID : req.body.RecipientID
      }
    }).then( recipient => {
      // staff id exist then check if Material Order is correct
      MaterialOrder.findOne({
        where: {
          ID : req.body.MaterialOrder.ID
        }
      }).then( materialorder => {
        //material order exist then create import
        Import.create({
          MaterialOrderID: materialorder.getDataValue('ID'),
          RecipientID: req.body.RecipientID,
          ArrivedDate: req.body.ArrivedDate
        }).then( imports => {
          // create import detail
          console.log('aaaaaaaaaaaaaaaaaa')
          var arr = []
          var orderList = req.body.ImportDetail
          var obj = {
            ImportID: imports.getDataValue('ID'),
            MaterialName: '',
            Amount: 0
          }
          orderList.forEach( order => {
            obj.MaterialName = order.MaterialName
            obj.Amount = order.Amount
            ImportDetail.create(obj).then( detail => {
              console.log('import detail => ', detail.get({plain:true}))
              Material.findOne({where:{MaterialName: order.MaterialName}}).then( material => {
                console.log('material => ',material.get({plain:true}))
                var amount = material.getDataValue('Amount')
                material.updateAttributes({Amount: amount+order.Amount}).then( up => {
                  console.log('updated value => ',up.get({plain:true}))
                }).catch( err => {
                  res.status(400).send('error while update value')
                })
              }).catch( err => {
                res.status(404).send('error while finding material')
              })
            }).catch( err => {
              res.status(404).send('error while create importdetail')
            })
          })
          console.log('import ==> ', imports.get({plain:true}))
          res.json(imports)
        }).catch( err => {
          res.status(404).send('error while creating import')
        })
      }).catch( err => {
        res.status(404).send('error while ')
      })
    }).catch( err => {
      res.status(404).send('error while finding recipient')
    })
  },
  async getImport(req, res) {
    await Import.findAll({
      include: [
        {model: Staff, as: 'Staff'},
        {model: MaterialOrder, as: 'MaterialOrder', include: [
          {model: Manufacturer,as: 'Manufacturer'}
        ]}
      ]
    }).then( im => {
      console.log('import => ', im)
      res.json(im)
    }).catch( err => {
      console.log('error : ', err)
      res.status(404).send('error while finding import')
    })
  },

  async getImportByID(req, res) {
    await Import.findOne({
      where: {
        ID : req.params.id
      },
      include: [
        { model: Staff, as: 'Staff' },
        { model: MaterialOrder, as: 'MaterialOrder', include: [
          {model: Manufacturer, as: 'Manufacturer'}
        ]},
      ]
    }).then( imports => {
      console.log('Load import -> success')
      res.json(imports)
    }).catch( err => {
      res.status(500).send({
        error : 'error : ' + err
      })
    })
  },

  async deleteImport(req, res) {
    await Import.findOne({
      where: {
        ID: req.params.id
      }
    }).then(imports => {
      var isDeleteSuccess = 'fail'
      var result = imports.destroy()
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

  async updateImport(req, res) {
    await Import.findOne({
      where: {
        ID : req.params.id
      }
    }).then( imports => {
      MaterialOrder.findOne({
        where: {
          ID : imports.MaterialOrderID
        }
      }).then( materialorder => {
        materialorder.updateAttributes({Status: req.body.Status}).then( updateditem => {
          console.log('updateditem : ', updateditem.get({plain:true}))
          res.json(updateditem)
        }).catch( err => {
          res.status(500).send('error while updating status in materialorder')
        })
      }).catch( err => {
        res.status(404).send('error while finding materialorder')
      })
    }).catch( err => {
      res.status(500).send('error while finding import')
    })
  }
}
