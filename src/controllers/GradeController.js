const User = require('../models/Usuario')
const Predio = require('../models/Predio')

async function index(req, res) {

    try {
        if (!req.credencial.id) {
            res.status(404).json({ msgErr: "Não foi possível ler o usuario. É necessário autenticar-se novamente!" })
            return res.redirect('/logout')
        }

        const user = await User.findByPk(req.credencial.id)

        if(!user) {
            res.status(404).json({ msgErr: "Usuário não cadastrado no sistema!" })
            return res.redirect('/logout')
        }

        const predios = await Predio.findAll({
            include: { association: 'salas' }
        })
        predios[0].salas
        res.status(200).render('grade/index', {user, predios})

    } catch (error) {
        console.error('Ocorreu um erro: ', error);
    }

}

module.exports = {
    index
}