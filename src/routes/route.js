const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuarioController = require('../controllers/UsuarioController')
const login = require('./login')
const logout = require('./logout')
const sala = require('./sala')
const predio = require('./predio')
const aresCondicionado = require('./ar-condicionado')
const gradeController = require('../controllers/GradeController')

const homeController = require('../controllers/HomeController')

router.get('/', authentication, homeController.index)

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario', authentication, usuarioController.index)
router.use('/sala', authentication, sala)
router.use('/predio', authentication, predio)
router.use('/ar-condicionado', authentication, aresCondicionado)
router.use('/grade', authentication, gradeController.index)



module.exports = router
