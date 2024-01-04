const express = require('express')
const router = express.Router()
const authController = require('../controllers/AuthController')

router.post('/', authController.login)
// router.get('/', (req, res) => {
//     res.json({ Pagina: 'login' })
// })


module.exports = router
