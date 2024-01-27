const Credencial = require('../models/Credencial')
const Predio = require('../models/Predio')

async function index(req, res) {

    try {
        if (!req.credencial.id) {
            res.status(404).json({ msgErr: "Não foi possível ler o usuario. É necessário autenticar-se novamente!" })
            return res.redirect('/logout')
        }
        const user = await Credencial.findByPk(req.credencial.id)

        if(!user) {
            res.status(404).json({ msgErr: "Usuário não cadastrado no sistema!" })
            return res.redirect('/logout')
        }
        
        const predios = await Predio.findAll({
            include: { association: 'salas' }
        })
        res.status(200).render('home', {user, predios})

    } catch (error) {
        console.error('Ocorreu um erro: ', error);
        return res.redirect('/logout')
    }

}

module.exports = {
    index
}