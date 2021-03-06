const models= require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  isAuth : function (req, res, next) {
    jwt.verify(req.headers.authentication, 'shhhhh', function (err, decoded) {
      if (err) {
        res.send({
          'status': err
        })
      } else {
        next()
      }
    })
  },
  isAdmin : function (req, res, next) {
    jwt.verify(req.headers.authentication, 'shhhhh', function (err, decoded) {
      models.User.findOne({
        where: {
          email: decoded.user
        }
      }).then(function (user) {
        if (user.role === 'admin') {
          next()
        } else {
          res.send({
            status: 'bukan admin'
          })
        }
      })
    })
  }
}
