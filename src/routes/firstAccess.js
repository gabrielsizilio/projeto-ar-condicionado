const express = require('express')
const router = express.Router()
const UsuarioController = require("../controllers/UsuarioController")

router.get('/', UsuarioController.registerUserIndex);

router.post('/:email', UsuarioController.registerUser);

module.exports = router;