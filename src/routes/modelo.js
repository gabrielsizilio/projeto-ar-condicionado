const express = require('express')
const router = express.Router()
const modeloController = require('../controllers/ModeloController')

router.get('/', modeloController.index)

router.get('/create', modeloController.create)

router.post('/store', modeloController.store)

router.get('/edit/:id', modeloController.edit)

router.post('/update/:id', modeloController.update)

router.post('/remove/:id', modeloController.remove)

module.exports = router