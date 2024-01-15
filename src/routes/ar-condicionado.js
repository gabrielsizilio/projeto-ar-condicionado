const express = require('express')
const router = express.Router()
const arCondiciandoController = require('../controllers/ArCondicionadoController')

router.get('/', arCondiciandoController.index)

router.get('/create', arCondiciandoController.create)

router.post('/save', arCondiciandoController.store)

module.exports = router