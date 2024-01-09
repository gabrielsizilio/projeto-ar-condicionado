const ArCondicionado = require('../models/ArCondicionado')
const Marca = require('../models/Marca')


async function index(req, res) {
    const ares = await ArCondicionado.findAll({
        include: [{ association: 'marca' }],
        order: [[{ model: Marca, as: 'marca' }, 'nome', 'ASC']]
    })

    return res.json(ares)
    // return res.render('/arCondicionado/index')
}

async function create(req, res) {
    try {
        const marcas = await Marca.findAll();

        return res.render('arCondicionado/create', { marcas })
    } catch (error) {
        console.log('ERRO: ', error);
    }
}

function edit(req, res) {

}

async function store(req, res) {
    const { nome, modelo, marca_id } = req.body

    try {
        const marca = await Marca.findByPk(marca_id)

        await ArCondicionado.create({
            nome,
            modelo,
            marca_id
        })

        res.redirect('/ar-condicionado')
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

function update(req, res) {

}

function remove(req, res) {

}

module.exports = {
    index,
    create,
    edit,
    store,
    update,
    remove
}