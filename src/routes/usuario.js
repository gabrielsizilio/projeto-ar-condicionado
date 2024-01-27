const express = require('express')
const router = express.Router()
const UsuarioController = require("../controllers/UsuarioController")

router.get('/', UsuarioController.index)

router.post('/store', UsuarioController.store)

router.post('/remove/:id', UsuarioController.remove)

module.exports = router