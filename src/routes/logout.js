const express = require('express')
const { joint, join } = require('node:path')
const router = express.Router()
const authGoogleController = require('../controllers/AuthGoogleController')

router.get('/', authGoogleController.logout)

module.exports = router
