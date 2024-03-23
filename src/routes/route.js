const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const logout = require('./logout')

const predio = require('./predio')
const grade = require('./grade')
const marca = require('./marca')

const homeController = require('../controllers/HomeController')

router.get('/', authentication, homeController.index)

router.get('/historico', function(req,res){
    res.render('historico')
})

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario',  usuario)
router.use('/predio', authentication, predio)
router.use('/grade', authentication, grade)
router.use('/marca', authentication, marca)

module.exports = router
