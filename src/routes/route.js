const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const logout = require('./logout')
const sala = require('./sala')
const aresCondicionados = require('./ar-condicionado')

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
router.use('/usuario', authentication, usuario)
router.use('/sala', authentication, sala)
router.use('/ar-condicionado', authentication, aresCondicionados)



module.exports = router
