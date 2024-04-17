const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authGoogleMiddleware')
const accessMiddleware = require('../middleware/accessMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const log = require('./log')

const predio = require('./predio')
const grade = require('./grade')
const marca = require('./marca')

const homeController = require('../controllers/HomeController')

router.get('/', authentication, homeController.index)

router.get('/historico', function(req,res){
    res.render('historico')
})

router.use('/login', login)
router.use('/usuario', authentication, usuario)
router.use('/predio', authentication, accessMiddleware(['Administrador', 'Manutenção']), predio)
router.use('/grade', authentication, accessMiddleware(['Administrador', 'Manutenção']), grade)
router.use('/logs', authentication, accessMiddleware(['Administrador', 'Manutenção']), log)
router.use('/marca', authentication, accessMiddleware(['Manutenção']), marca)

module.exports = router
