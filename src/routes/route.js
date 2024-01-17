const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const logout = require('./logout')
const sala = require('./sala')
const predio = require('./predio')
const aresCondicionado = require('./ar-condicionado')

const homeController = require('../controllers/HomeController')

router.get('/', authentication, homeController.index)

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario', authentication, usuario)
router.use('/sala', authentication, sala)
router.use('/predio', authentication, predio)
router.use('/ar-condicionado', authentication, aresCondicionado)



module.exports = router
