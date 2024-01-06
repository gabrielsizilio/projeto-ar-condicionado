const express = require('express')
const { joint, join } = require('node:path')
const router = express.Router()
const authController = require('../controllers/AuthController')


// router.post('/', (req, res) => {
//     console.log(req.body.email, " ", req.body.password);
//     authController.login
// })

router.get('/', authController.index)
router.post('/', authController.login)

module.exports = router
