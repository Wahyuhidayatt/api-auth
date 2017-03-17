var express = require('express')
var router = express.Router()
var api = require('../controllers/api')
var auth = require('../middlewares/auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/api/signup', api.signup)

router.post('/api/signin', api.signin)

module.exports = router
