const User = require('../models/Usuario')
const Predio = require('../models/Predio')

async function index(req, res) {

    const user = await User.findAll({include: [{association: 'credencial'}]})
    const predios = await Predio.findAll({
        include: { association: 'salas' }
    })

    try {
        res.status(200).render('grade/index', {user, predios})
    } catch (error) {
        console.error('Ocorreu um erro: ', error);
    }

}

module.exports = {
    index
}