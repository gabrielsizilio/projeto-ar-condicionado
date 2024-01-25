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
    const { model_id, temp16, temp17, temp18, temp19, temp20, temp21, temp22, temp23, temp24, temp25, off } = req.body

    try {
        const temperatura = await Temperatura.create({
            temp16,
            temp17,
            temp18,
            temp19,
            temp20,
            temp21,
            temp22,
            temp23,
            temp24,
            temp25,
            off,
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