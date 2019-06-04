const { sequelize } = require('../src/models')
const {
  Category,
  Duty,
  Export,
  ExportDetail,
  Import,
  ImportDetail,
  Manufacturer,
  Material,
  MaterialOrderDetail,
  MaterialOrder,
  PaymentMethod,
  Position,
  Product,
  ProductConversion,
  PurchaseOrder,
  PurchaseOrderDetail,
  Requisition,
  Staff,
  User,
  WorkOrder,
  WorkOrderImportExport,
  WorkOrderPackage
} = require('../src/models')
//import seed file below EX : const { User } = require('./models)

const Promise = require('bluebird')
//import all seed file EX:  const category = require('./category.json')
const categories             = require('./Category.json')
const duties                 = require('./Duty.json')
const exportss               = require('./Export.json')
const exportDetails          = require('./ExportDetail.json')
const importss               = require('./Import.json')
const importDetails          = require('./ImportDetail.json')
const manufacturers          = require('./Manufacturer.json')
const materials              = require('./Material.json')
const materialOrderDetails   = require('./MaterialOrderDetail.json')
const materialOrders         = require('./MaterialOrder.json')
const paymentMethods         = require('./PaymentMethod.json')
const positions              = require('./Position.json')
const products               = require('./Product.json')
const productConversions     = require('./ProductConversion.json')
const purchaseOrders         = require('./PurchaseOrder.json')
const purchaseOrderDetails   = require('./PurchaseOrderDetail.json')
const requisitions           = require('./Requisition.json')
const staffs                 = require('./Staff.json')
const users                  = require('./User.json')
const workOrders             = require('./WorkOrder.json')
const workOrderImportExports = require('./WorkOrderImportExport.json')
const workOrderPackages      = require('./WorkOrderPackage.json')
//if {force: true} this will execute all data in database

//after sync up sequelize, .then() to create a seed data in database
//EX : sequelize.sync({force: true}).then()
sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      categories.map(category => {
        Category.create(category)
      }),
      materials.map(material => {
        Material.create(material)
      }),
      manufacturers.map(manufacturer => {
        Manufacturer.create(manufacturer)
      }),
      positions.map(position => {
        Position.create(position)
      }),
      paymentMethods.map(paymentMethod => {
        PaymentMethod.create(paymentMethod)
      }),
      users.map(user => {
        User.create(user)
      }),
      duties.map(duty => {
        Duty.create(duty)
      }),
    ).then(async function(){
      await Promise.all(
        products.map(product => {
          Product.create(product)
        }),
        materialOrders.map(materialOrder => {
          MaterialOrder.create(materialOrder)
        }),
        staffs.map(staff => {
          Staff.create(staff)
        }),
        purchaseOrders.map(purchaseOrder => {
          PurchaseOrder.create(purchaseOrder)
        }),
      ).then(async function(){
        await Promise.all(
          productConversions.map(productConversion => {
            ProductConversion.create(productConversion)
          }),
          materialOrderDetails.map(materialOrderDetail => {
            MaterialOrderDetail.create(materialOrderDetail)
          }),
          importss.map(im => {
            Import.create(im)
          }),
          purchaseOrderDetails.map(purchaseOrderDetail => {
            PurchaseOrderDetail.create(purchaseOrderDetail)
          }),
          exportss.map(ex => {
            Export.create(ex)
          }),
          workOrders.map(workOrder => {
            WorkOrder.create(workOrder)
          }),
        ).then(async function(){
          await Promise.all(
            importDetails.map(importDetail => {
              ImportDetail.create(importDetail)
            }),  
            exportDetails.map(exportDetail => {
              ExportDetail.create(exportDetail)
            }),
            workOrderImportExports.map(workOrderImportExport => {
              WorkOrderImportExport.create(workOrderImportExport)
            }),
            workOrderPackages.map(workOrderPackage => {
              WorkOrderPackage.create(workOrderPackage)
            }),
            requisitions.map(requisition => {
              Requisition.create(requisition)
            })
          )
        })
      })
    })
  })

