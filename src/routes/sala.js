const express = require('express');
const salaController = require('../controllers/SalaController');
const aresCondicionado = require('./ar-condicionado')
const router = express.Router()

router.get('/:id', salaController.index)

router.get('/create', salaController.create)

router.post('/store', salaController.store)

router.get('/edit/:id', salaController.edit)

router.post('/update/:sala_id', salaController.update)

router.post('/remove/:id', salaController.remove)

router.use('/:id/ar-condicionado', aresCondicionado)

module.exports = router;