const express = require('express')
const router = express.Router()
const LogController = require("../controllers/LogController")

router.get('/', LogController.index)

module.exports = router