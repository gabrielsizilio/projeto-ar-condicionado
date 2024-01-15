const express = require('express');
const SalaController = require('../controllers/SalaController');
const router = express.Router()

router.get('/', SalaController.index)

router.get('/create', SalaController.create)

module.exports = router;