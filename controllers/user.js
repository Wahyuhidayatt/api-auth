var User = require('../models').User
var jwt = require('jsonwebtoken')
var crypto = require('crypto')

module.exports = {
  getUsers : function (req, res) {
    user.findAll().then(function (users) {
      res.json(users)
    })
  },
  getUser : function (req, res) {
    user.findById(req.params.id).then(function (user) {
      res.json(user)
    })
  },
  addUser : function (req, res) {
    user.create(req.body).then(function (user) {
      res.send({
        status : success
      })
    })
  },
  deleteUser : function (req, res) {
    user.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (status) {
      res.status(200).send({
        'status': status,
        'message': `successfully`
      })
    })
  },
  updateUser : function (req, res) {
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (status) {
      res.status(200).send({
        'status': status,
        'message': `successfully`
      })
    })
  }
}


//========== Catatan ==============

// let contoh = {}
//
// nama function = function nya
//
// module.exports = {
//   nama function : functionnya
// }
