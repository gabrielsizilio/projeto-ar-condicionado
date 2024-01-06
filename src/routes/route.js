const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const logout = require('./logout')

router.get('/', authentication, (req, res) => {
    // res.json({ Pagina: 'Principal' })
    const user = {
        nome: 'Gabriel',
        sobrenome: 'Sizilio'
    }
    res.render('principal', { user })
})

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario', usuario)



module.exports = router
