const express = require('express')
const router = express.Router()
const arCondiciandoController = require('../controllers/ArCondicionadoController')

const modelo = require('./modelo')
const temperatura = require('./temperatura')

router.get('/', arCondiciandoController.index)

router.get('/create', arCondiciandoController.create)

router.post('/store', arCondiciandoController.store)

router.get('/edit/:id', arCondiciandoController.edit)

router.post('/update/:id', arCondiciandoController.update)

router.post('/remove/:id', arCondiciandoController.remove)

router.use('/modelo', modelo)

router.use('/temperatura', temperatura)

module.exports = router