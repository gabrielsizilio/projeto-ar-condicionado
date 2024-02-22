const ArCondicionado = require('../models/ArCondicionado')
const Modelo = require('../models/Modelo')
const Marca = require('../models/Marca')


async function index(req, res) {
    const ares = await ArCondicionado.findAll({
        include: [{
            model: Modelo, as: 'modelo',
            include: [{
                model: Marca, as: 'marca'
            }]
        }],
        order: [[{ model: Modelo, as: 'modelo' },
        { model: Marca, as: 'marca' },
            'nome', 'ASC']]
    })

    return res.json(ares)
    // return res.render('/arCondicionado/index')
}

async function create(req, res) {
    try {
        const arCondicionados = await ArCondicionado.findAll({
            include: [{
                model: Modelo, as: 'modelo',
                include: [{
                    model: Marca, as: 'marca'
                }]
            }]
        });

        return res.render('arCondicionado/create', { arCondicionados })
    } catch (error) {
        console.log('ERRO: ', error);
    }
}

async function store(req, res) {
    const { nome, modelo_id, sala_id } = req.body

    if (!nome || !modelo_id || !sala_id) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        const modelo = await Modelo.findByPk(modelo_id)

        await ArCondicionado.create({
            nome,
            modelo_id,
            sala_id
        })

        res.redirect('/ar-condicionado')
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function edit(req, res) {
    const ar_id = req.params

    try {
        const arCondicionado = await ArCondicionado.findOne({
            where: { id: ar_id.id }
        })

        if (!arCondicionado) {
            return res.status(404).json({ msgErr: 'Ar-condicionado não cadastrado no sistema' })
        }

        res.json(arCondicionado)
    } catch (error) {
        console.log(error)
    }
}


async function update(req, res) {
    const ar_id = req.params
    const { nome, modelo_id } = req.body

    if (!nome || !modelo_id) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    if (!ar_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual o ar-condicionado a ser editado.' })
    }

    try {
        const arCondicionado = await ArCondicionado.findOne({
            where: { id: ar_id.id },
            include: [{ model: Modelo, as: 'modelo' }]
        })

        if (!arCondicionado) {
            return res.status(404).json({ msgErr: 'Ar-condicionado não encontrado.' })
        }

        await arCondicionado.update({
            nome,
            modelo_id,
        })

        return res.status(200).json({ arCondicionado })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

async function remove(req, res) {
    const ar_id = req.params

    if (!ar_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual o ar-condicionado a ser removido.' })
    }

    try {
        const arCondicionado = await ArCondicionado.findByPk(ar_id.id)

        if (!arCondicionado) {
            return res.status(404).json({ msgErr: 'Ar-condicionado não encontrado.' })
        }

        await arCondicionado.destroy()

        res.json({ msg: "Ar-condicionado excluído do sistema" })

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