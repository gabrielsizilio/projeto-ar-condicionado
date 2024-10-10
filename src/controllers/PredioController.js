const { checkToken } = require('../config/auth');
const Credencial = require('../models/Credencial');
const Predio = require('../models/Predio')
const PredioService = require('../services/PredioService')
const Sala = require('../models/Sala');
const Usuario = require('../models/Usuario');
const { getUserByJWT } = require('../services/usuarioService');


async function index(req, res) {

    const predios = await Predio.findAll({
        include: {association: 'salas'}
    })

    const user = await getUserByJWT(req.cookies.jwt);

    res.status(200).render('predio/index' ,{ predios, user });
}

async function create(req, res) {

}

async function store(req, res) {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msgErr: 'O campo nome é obrigatório.' })
    }

    try {
        await PredioService.createPredio({ nome })

        res.redirect('/predio')
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function edit(req, res) {
    const predio_id = req.params

    try {
        const predio = await predio.findByPk(predio_id)

        if (!predio) {
            return res.status(404).json({ msgErr: 'Prédio não cadastrado no sistema' })
        }

        return res.json(predio)
    } catch (error) {
        console.log(error)
    }
}

async function update(req, res) {
    const predio_id = req.params
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msgErr: 'O campo nome é obrigatório.' })
    }

    if (!predio_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual predio será editado.' })
    }

    try {
        const predio = await PredioService.updatePredio(nome, predio_id)

        return res.status(200).json({ predio })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error })
    }
}

async function remove(req, res) {
    const predio_id = req.params

    if (!predio_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual predio será removido.' })
    }

    try {
        PredioService.deletePredio(predio_id);
        res.json({ msg: "Prédio excluído com sucesso!" })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    remove
}