const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authMiddleware')

const usuario = require('./usuario')
const login = require('./login')
const logout = require('./logout')
const sala = require('./sala')
const predio = require('./predio')
const aresCondicionado = require('./ar-condicionado')
const grade = require('./grade')

router.get('/', authentication, (req, res) => {
    // res.json({ Pagina: 'Principal' })
    // const title = 'Principal'
    const user = {
        nome: 'Yodemis',
    }
    res.render('home', { user })
})

router.get('/historico', function(req,res){
    res.render('historico')
})

router.use('/login', login)
router.use('/logout', logout)
router.use('/usuario', authentication, usuario)
router.use('/sala', authentication, sala)
router.use('/predio', authentication, predio)
router.use('/ar-condicionado', authentication, aresCondicionado)
router.use('/grade', authentication, grade)



module.exports = router
