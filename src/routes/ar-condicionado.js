const express = require('express')
const router = express.Router()
const arCondiciandoController = require('../controllers/ArCondicionadoController')

router.get('/', arCondiciandoController.index)

router.get('/create', arCondiciandoController.create)

router.post('/store', arCondiciandoController.store)

router.get('/edit/:id', arCondiciandoController.edit)

router.post('/update/:id', arCondiciandoController.update)

router.post('/remove/:id', arCondiciandoController.remove)

module.exports = router