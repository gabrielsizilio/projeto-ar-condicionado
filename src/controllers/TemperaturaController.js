const Temperatura = require('../models/Temperatura')
const Modelo = require('../models/Modelo')
const ArCondicionado = require('../models/ArCondicionado')


async function index(req, res) {

    try {

    } catch (error) {

    }

    const ares = await ArCondicionado.findAll({
        include: [{
            model: Modelo, as: 'modelo',
            include: [{
                model: Temperatura, as: 'temperatura'
            }]
        }]
    })

    res.status(200).json({ ares })
}

async function create(req, res) {

}

async function store(req, res) {
    const { model_id, tem16, tem17, tem18, tem19, tem20, tem21, tem22, tem23, tem24, tem25 } = req.body

    try {
        const temperatura = await Temperatura.create({
            tem16,
            tem17,
            tem18,
            tem19,
            tem20,
            tem21,
            tem22,
            tem23,
            tem24,
            tem25,
            model_id
        })

        res.status(200).json({ temperatura })

    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function edit(req, res) {

}

async function update(req, res) {

}

async function remove(req, res) {

}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    remove
}