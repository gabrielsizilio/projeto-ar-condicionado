const express = require('express')
const router = express.Router()
const CredencialController = require('../controllers/CredencialController')
const authentication = require('../middleware/authMiddleware')


/**
 * C - create
 * R - read
 * U - update
 * D - delete
 */

router.get('/', authentication, CredencialController.index)

router.post('/cadastrar', CredencialController.create)

module.exports = router