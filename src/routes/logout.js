const express = require('express')
const { joint, join } = require('node:path')
const router = express.Router()
const authController = require('../controllers/AuthController')

router.get('/', authController.logout)

module.exports = router
