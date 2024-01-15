const express = require('express');
const salaController = require('../controllers/SalaController');
const router = express.Router()

router.get('/', salaController.index)

router.get('/create', salaController.create)

router.post('/store', salaController.store)

router.get('/edit/:id', salaController.edit)

router.post('/update/:id', salaController.update)

router.post('/remove/:id', salaController.remove)

module.exports = router;