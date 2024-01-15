const express = require('express')
const router = express.Router()
const marcaController = require('../controllers/MarcaController')

router.get('/', marcaController.index)

router.get('/create', marcaController.create)

router.post('/store', marcaController.store)

router.get('/edit/:id', marcaController.edit)

router.post('/update/:id', marcaController.update)

router.post('/remove/:id', marcaController.remove)

module.exports = router