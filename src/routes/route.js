const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const logout = require('./logout')
const log = require('./log')

const predio = require('./predio')
const aresCondicionado = require('./ar-condicionado')
const grade = require('./grade')

const homeController = require('../controllers/HomeController')

router.get('/', authentication, homeController.index)

router.get('/historico', function(req,res){
    res.render('historico')
})

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario',  usuario)
router.use('/predio', authentication, predio)
router.use('/ar-condicionado', authentication, aresCondicionado)
router.use('/grade', authentication, grade)
router.use('/logs', authentication, log)

module.exports = router
