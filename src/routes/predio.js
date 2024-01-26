const express = require('express');
const predioController = require('../controllers/PredioController');
const router = express.Router()

router.get('/', predioController.index)

router.get('/create', predioController.create)

router.post('/store', predioController.store)

router.get('/edit/:id', predioController.edit)

router.post('/update/:id', predioController.update)

router.post('/remove/:id', predioController.remove)

module.exports = router;