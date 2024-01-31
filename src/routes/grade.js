const express = require('express')
const router = express.Router()
const GradeController = require("../controllers/GradeController")
const authentication = require('../middleware/authMiddleware')

router.get('/', authentication, GradeController.index)

module.exports = router