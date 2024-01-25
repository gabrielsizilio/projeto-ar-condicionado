const express = require('express')
const router = express.Router()
const temperaturaController = require('../controllers/TemperaturaController')

router.get('/', temperaturaController.index)

router.get('/create', temperaturaController.create)

router.post('/store', temperaturaController.store)

router.get('/edit/:id', temperaturaController.edit)

router.post('/update/:id', temperaturaController.update)

router.post('/remove/:id', temperaturaController.remove)

module.exports = router