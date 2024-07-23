const express = require('express')
const router = express.Router()
const UsuarioController = require("../controllers/UsuarioController")

router.get('/:email', UsuarioController.registerUserIndex);

router.post('/:email', UsuarioController.registerUser);

module.exports = router;