const express = require('express')
const { joint, join } = require('node:path')
const router = express.Router()
const authController = require('../controllers/AuthController')

// router.post('/', authController.login)
// router.get('/', (req, res) => {
//     res.json({ Pagina: 'login' })
// })

router.get('/', (req, res) => {
    console.log();
    res.sendFile(join(__dirname, '../..', 'public', 'html', 'login.html'))
})

module.exports = router
