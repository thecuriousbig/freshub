const { Material } = require('../models')

module.exports = {
  async createMaterial(req, res) {
   await Material.create({
     MaterialName:req.body.MaterialName,
     Unit:req.body.Unit,
     Amount:req.body.Amount
   }).then(material=>{
     console.log('yay')
     res.send('s')
   }).catch(err=>{
    res.status(400).send({
      error: 'error : ' + err
    })
   })
  },

  async getMaterial(req, res) {
    await Material.findAll({}).then(material => {
      console.log('result : ', material)
      res.json(material)
    }).catch(err => {
      res.status(500).send({
        error: 'error : ' + err
      })
    }) 
  },

  async getMaterialByID(req, res) {
    await Material.findOne({
      where: {
        ID : req.params.id
      }
    }).then( material => {
      console.log('result : ', material.dataValues)
      res.json(material)
    }).catch( err => {
      res.status(500).send({
        error : 'error : ' + err
      })
    }) 
  },

  async deleteMaterial(req, res) {
    await Material.findOne({
      where: {
        ID: req.params.id
      }
    }).then(material => {
      var isDeleteSuccess = 'fail'
      var result = material.destroy()
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

  async updateMaterial(req, res) {
    var update = req.body
    await Material.findOne({
      where: {
        ID: req.params.id
      }
    }).then(materials => {
      materials.update(update).then( mate => {
        console.log('mate : ', mate.get({plain:true}))
        res.json(mate)
      }).catch( err => {
        res.status(500).send('error while update')
      })
    }).catch( err => {
      res.status(404).send('error while finding')
    })
  }
}