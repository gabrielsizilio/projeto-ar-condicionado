const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const logout = require('./logout')
const sala = require('./sala')
const aresCondicionado = require('./ar-condicionado')

router.get('/', authentication, (req, res) => {
    // res.json({ Pagina: 'Principal' })
    // const title = 'Principal'
    const user = {
        nome: 'Yodemis',
    }
    res.render('home', { user })
})

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario', authentication, usuario)
router.use('/sala', authentication, sala)
router.use('/ar-condicionado', authentication, aresCondicionado)



module.exports = router
