const express = require('express')
const router = express.Router()
const UsuarioController = require("../controllers/UsuarioController")
const authentication = require('../middleware/authMiddleware')

router.get('/', UsuarioController.index)

router.post('/cadastrar', UsuarioController.create)

module.exports = router