'use strict';
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt:DataTypes.STRING,
    role:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      hooks:{
        beforeCreate: function(models){
          let random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567789'
          let salt = '';
          for (var i = 0; i < 5; i++) {
            salt += random.charAt(Math.floor(Math.random() * random.length))
          }
          const hash = crypto.createHmac('sha256', salt)
                             .update(models.password)
                             .digest('hex');
          models.password = hash
          models.salt = salt
        }
      }
  });
  return user;
};


//========================Bisa juga menggunakan==============================//
// hooks: {
//       beforeCreate: function (user) {
//         var salt = crypto.randomBytes(10).toString('hex')
//         const password = user.password
//         const hash = crypto.createHmac('sha256', password)
//           .update(salt)
//         user.password = hash.digest('hex')
//         user.salt = salt
//       }
//     }
//   })
//   return User
// }
