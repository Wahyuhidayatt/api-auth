var db = require('../models/user')
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
  signup: function(req, res) {
    db.user.create(req.body).then(function(data){
      res.send(data)
    })
  },
  
  signin: function(req, res, next){
    db.user.findOne({
      where : {username : req.body.username}
    }).then(function(data){
      console.log(data);
      const hash = crypto.createHmac('sha256', data.salt)
                         .update(req.body.password)
                         .digest('hex');

      if(hash == data.password) {
        var token = jwt.sign({ username: data.username, role:data.role}, 'jo');
        res.send(token)
      }
    })
  }
  // user: function(req, res, next){
  //   jwt.verify(req.headers.auth, 'jo', function(err, decoded) {
  //     if(decoded.email !== email){
  //       res.send('Bukan admin')
  //     }else{
  //       db.user.findAll().then(function(data){
  //       res.send(data)
  //       })
  //     }
  //   })
  // },
  // getRole: function(req, res){
  //   jwt.verify(req.headers.auth, 'jo', function(err, decoded) {
  //     if(decoded.role == 'admin'){
  //       db.user.findAll(req.params.id).then(function(data){
  //         res.send(data)
  //       })
  //     }else if(decoded.role != 'admin' && decoded.id == req.params.id){
  //       db.user.findById(req.parmas.id).then(function(data){
  //         res.send(data)
  //       })
  //     }else{
  //       res.send("Tidak bisa akses data")
  //     }
  //   })
  // }
}
