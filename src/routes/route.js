const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const sala = require('./sala')

router.get('/', (req, res) => {
    res.json({ Pagina: 'Principal' })
})

router.use('/login', login)
router.use('/usuario', usuario)
router.use('/sala',sala)






module.exports = router
