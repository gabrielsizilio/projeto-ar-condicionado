const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authGoogleMiddleware')
const accessMiddleware = require('../middleware/accessMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const log = require('./log')
const logout = require('./logout')

const predio = require('./predio')
const agendamento = require('./schedule')
const grade = require('./grade')
const marca = require('./marca')
const firstAccess = require('./firstAccess')

const homeController = require('../controllers/HomeController')

router.get('/', authentication, homeController.index)

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario', authentication, accessMiddleware(['Administrador', 'Manutenção']), usuario)
router.use('/predio', authentication, accessMiddleware(['Administrador', 'Manutenção']), predio)
router.use('/agendamento', authentication, accessMiddleware(['Administrador', 'Manutenção']), agendamento)
router.use('/grade', authentication, accessMiddleware(['Administrador', 'Manutenção']), grade)
router.use('/logs', authentication, accessMiddleware(['Administrador', 'Manutenção']), log)
router.use('/marca', authentication, accessMiddleware(['Manutenção']), marca)
router.use('/firstAccess', firstAccess);

module.exports = router
