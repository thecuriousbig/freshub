//route for sending a req and get a res
const AuthenticationController = require('./controllers/AuthenticationController')
const WorkOrderController = require('./controllers/WorkOrderController')
const WorkOrderPackageController = require('./controllers/WorkOrderPackageController')
const ExportController = require('./controllers/ExportController')
const ExportDetailController = require('./controllers/ExportDetailController')
const ImportController = require('./controllers/ImportController')
const ImportDetailController = require('./controllers/ImportDetailController')
const MaterialOrderController = require('./controllers/MaterialOrderController')
const MaterialOrderDetailController = require('./controllers/MaterialOrderDetailController')
const MaterialController = require('./controllers/MaterialController')
const ProductController = require('./controllers/ProductController')
const PurchaseOrderController =require('./controllers/PurchaseOrderController')
const PurchaseOrderDetailController = require('./controllers/PurchaseOrderDetailController')
const CategoryController = require('./controllers/CategoryController')
const StaffController = require('./controllers/StaffController')
const PaymentMethodController = require('./controllers/PaymentMethodController')
const ManufacturerController = require('./controllers/ManufacturerController')
const {User} = require('./models')
const AuthenticationControllerPolicy =require('./policies/AuthenticationControllerPolicy')
//export a couple mehtod which contain a req such as post , get and etc
module.exports = (app) => {

  app.get('/api/user', function(req, res) {
    User.findAll({}).then( user => {
      res.json(user)
    }).catch( err => {
      res.status(500).send('error while finding user')
    })
  })
  /*AuthenticationService*/
  app.post('/api/user/register',AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/api/user/login',AuthenticationController.login)
  app.post('/api/staff/login',AuthenticationController.staffLogin)
  app.post('/api/staff/register',AuthenticationController.staffRegister)

  /*WorkOrderService*/
  app.post('/api/workorder',WorkOrderController.createWorkOrder)
  app.get('/api/workorder',WorkOrderController.getWorkOrder)
  app.get('/api/workorder/:id',WorkOrderController.getWorkOrderByID)
  app.delete('/api/workorder/:id',WorkOrderController.deleteWorkOrder)
  app.put('/api/workorder/:id',WorkOrderController.updateWorkOrder)
  /*WorkOrderPackageService */
  app.get('/api/workorder/:id/package',WorkOrderPackageController.getWorkOrderPackageByID)

  /*ExportService*/
  app.post('/api/export',ExportController.createExport)
  app.get('/api/export',ExportController.getExport)
  app.get('/api/export/:id',ExportController.getExportByID)
  app.delete('/api/export/:id',ExportController.deleteExport)
  app.put('/api/export/:id',ExportController.updateExport)
  /*ExportDetailService*/
  app.get('/api/export/detail/:id/',ExportDetailController.getExportDetailByID)


  /*ImportService*/
  app.post('/api/import',ImportController.createImport)
  app.get('/api/import',ImportController.getImport)
  app.get('/api/import/:id',ImportController.getImportByID)
  app.delete('/api/import/:id', ImportController.deleteImport)
  app.put('/api/import/:id', ImportController.updateImport)
  /*ImportDetailService*/
  app.get('/api/import/detail/:id',ImportDetailController.getImportDetailByID)

  /*MaterialOrderService*/
  app.post('/api/materialorder',MaterialOrderController.createMaterialOrder)
  app.get('/api/materialorder',MaterialOrderController.getMaterialOrder)
  app.get('/api/materialorder/:id',MaterialOrderController.getMaterialOrderByID)
  app.delete('/api/materialorder/:id', MaterialOrderController.deleteMaterialOrder)
  app.put('/api/materialorder/:id',MaterialOrderController.updateMaterialOrder)
  /*MaterialOrderDetailService*/
  app.get('/api/materialorder/detail/:id',MaterialOrderDetailController.getMaterialOrderDetailByID)


  /*MaterialStorageService*/
  app.post('/api/material',MaterialController.createMaterial)
  app.get('/api/material',MaterialController.getMaterial)
  app.get('/api/material/:id',MaterialController.getMaterialByID)
  app.delete('/api/material/:id',MaterialController.deleteMaterial)
  app.put('/api/material/:id',MaterialController.updateMaterial)

  /*ManufacturerService*/
  app.get('/api/manufacturer',ManufacturerController.getManufacturer)
  app.get(`/api/manufacturer/:id`,ManufacturerController.getManufacturerByID)

  /*ProductStorageService*/
  app.post('/api/product',ProductController.createProduct)
  app.get('/api/product',ProductController.getProduct)
  app.get('/api/product/:id',ProductController.getProductByID)
  app.get('/api/product/category/:category',ProductController.getProductByCategory)
  app.delete('/api/product/:id',ProductController.deleteProduct)
  app.put('/api/product/:id',ProductController.updateProduct)

  /*PurchaseOrderService*/
  app.post('/api/purchaseorder',PurchaseOrderController.createPurchaseOrder)
  app.get('/api/purchaseorder',PurchaseOrderController.getPurchaseOrder)
  app.get('/api/purchaseorder/:id',PurchaseOrderController.getPurchaseOrderByID)
  app.get('/api/purchaseorder/user/:userId',PurchaseOrderController.getPurchaseOrderByUserID)
  app.delete('/api/purchaseorder/:id',PurchaseOrderController.deletePurchaseOrder)
  app.put('/api/purchaseorder/:id',PurchaseOrderController.updatePurchaseOrder)
  /*PurchaseOrderDetailService*/
  app.get('/api/purchaseorder/detail/:id',PurchaseOrderDetailController.getPurchaseOrderDetailByID)

  /*StaffListService*/
  app.get('/api/staff',StaffController.getStaff)
  app.get('/api/staff/:id',StaffController.getStaffByID)
  app.delete('/api/staff/:id',StaffController.deleteStaff)
  app.put('/api/staff/:id',StaffController.updateStaff)
  app.post('/api/staff', StaffController.createStaff)

  /*Category*/
  app.get('/api/category',CategoryController.getCategory)
  
  /*PaymentMethod*/
  app.get('/api/payment/',PaymentMethodController.getPaymentMethod)
  app.get('/api/payment/:id',PaymentMethodController.getPaymentMethodByID)

}
