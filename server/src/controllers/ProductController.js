const Sequelize = require('sequelize');
const { Product } = require('../models')
const { Category } = require('../models')
module.exports = {

  async createProduct(req, res) {
    await Category.findOne({
      where:{
        Name:req.body.CategoryName
      }
    }).then(category =>{
      console.log('category  ', category.get({plain:true}) )
      Product.create({
        Name:req.body.Name,
        CategoryName:req.body.CategoryName,
        Unit:req.body.Unit,
        Price:req.body.Price,
        Amount:req.body.Amount
      }).then(product=>{
        console.log('product : ', product.get({plain:true}))
        res.send(product)
      }).catch(err=>{
        res.status(400).send({
          error: 'error : ' + err
        })
      })
    }).catch(err=>{
      res.status(400).send({
        error: 'error : ' + err
      })
    })
  },
  async getProduct(req, res) {
    await Product.findAll({}).then(product => {
      res.json(product)
    }).catch(err => {
      console.log('result : ', product)
      res.status(500).send({
        error: 'error : ' + err
      })
    })
  },

  async getProductByID(req, res) {
    await Product.findOne({
      where: {
        ID : req.params.id
      }
    }).then( product => {
      res.json(product)
    }).catch( err => {
      console.log('result : ', product.dataValues)
      res.status(500).send({
        error : 'error : ' + err
      })
    })
  },
  
  async getProductByCategory(req, res) {
    let lookup_category =  req.params.category.toLowerCase();
    await Product.findAll({
      where: {
        CategoryName : Sequelize.where(Sequelize.fn('LOWER',Sequelize.col('CategoryName')),'LIKE','%'+lookup_category+'%')
      }
    }).then( product => {
      res.json(product)
    }).catch( err => {
      res.status(500).send({
        error : 'error : ' + err
      })
    })
  },

  async deleteProduct(req, res) {
    await Product.findOne({
      where: {
        ID: req.params.id
      }
    }).then(product => {
      var isDeleteSuccess = 'fail'
      var result = workorder.destroy()
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

  async updateProduct(req, res) {
    var update = req.body
    await Product.findOne({
      where: {
        ID: req.params.id
      }
    }).then(products => {
      products.update(update).then(prod => {
        console.log('prod : ', prod.get({ plain: true }))
        res.json(prod)
      }).catch(err => {
        res.status(500).send('error while update')
      })
    }).catch(err => {
      res.status(404).send('error while finding')
    })
  }
}
