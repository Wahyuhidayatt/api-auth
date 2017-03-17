var express = require('express')
var router = express.Router()
var user = require('../controllers/user')
var auth = require('../middlewares/auth')

/* GET users listing. */
router.get('/', auth.isAuth, auth.isAdmin, user.getUsers)

router.get('/:id', auth.isAuth, user.getUser)

router.post('/', auth.isAuth, auth.isAdmin, user.addUser)

router.delete('/:id', auth.isAuth, auth.isAdmin, user.deleteUser)

router.put('/:id', auth.isAuth, user.updateUser)

module.exports = router
