const { Staff } = require('../models')
const { Position } = require('../models')
module.exports = {
 
  async getStaff(req, res) {
    //try to get all Staff
    await Staff.findAll({
      include : [
        {model: Position, as: 'Position', required: false}
      ]
    }).then(staff => {
      console.log('Load staff -> success')
      res.json(staff)
    }).catch(err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },

  async getStaffByID(req, res) {
    //try to get staff by ID
    await Staff.findOne({
      where: {
        ID : req.params.id
      },
      include: [
        { model: Position, as: 'Position', required: false }
      ]
    }).then( staff => {
      console.log('result : ', staff.dataValues)
      res.json(staff)
    }).catch( err => {
      res.status(404).send({
        error: 'error : ' + err
      })
    })
  },

  async deleteStaff(req, res) {
    await Staff.findOne({
      where: {
        ID: req.params.id
      }
    }).then(staff => {
      var isDeleteSuccess = 'fail'
      var result = staff.destroy()
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

  async updateStaff(req, res) {
    try {
      var updates = req.body.Update
      Staff.find({
        where: { ID: req.body.id }
      }).on('success', (staff) => {
        staff.updateAttributes(updates).then((staff) => {
            res.json(staff)
          })
      })
    } catch (err) {
      res.status(500).send({
        error: 'export error : ' + err
      })
    }
  },

  async createStaff(req, res) {
    var PositionID
    if (req.body.Position == 'Admin') {
      PositionID = 1
    } else if (req.body.Position == 'Manager') {
      PositionID = 2
    } else {
      PositionID = 3
    }
    await Staff.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Address: req.body.Address,
      TelNo: req.body.TelNo,
      PositionID : PositionID,
      Password: 'password'
    }).then( st => {
      console.log('ststststststst : ', st.get({plain:true}))
      res.json(st)
    }).catch( err => {
      res.status(500).send('err ' , err)
    })
  }
}
