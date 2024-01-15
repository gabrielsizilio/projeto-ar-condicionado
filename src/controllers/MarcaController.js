const Marca = require('../models/Marca')


async function index(req, res) {
    const marcas = await Marca.findAll({order: [['nome', 'ASC']]})

    return res.json(marcas)
    // return res.render('/arCondicionado/index')
}

async function create(req, res) {

}

async function store(req, res) {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        await Marca.create({
            nome
        })

        res.redirect('/ar-condicionado')
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function edit(req, res) {
    const marca_id = req.params

    try {
        const marca = await Marca.findOne({
            where: { id: marca_id.id }
        })

        if (!marca) {
            return res.status(404).json({ msgErr: 'Marca não cadastrado no sistema' })
        }

        return res.json(marca)
    } catch (error) {
        console.log(error)
    }
}


async function update(req, res) {
    const marca_id = req.params
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    if (!marca_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual marca será editado.' })
    }

    try {
        const marca = await Marca.findOne({
            where: { id: marca_id.id }
        })

        if (!marca) {
            return res.status(404).json({ msgErr: 'Marca não encontrado.' })
        }

        await marca.update({
            nome
        })

        return res.status(200).json({ marca })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

async function remove(req, res) {
    const marca_id = req.params

    if (!marca_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual marca será removida.' })
    }

    try {
        const marca = await Marca.findByPk(marca_id.id)

        if (!marca) {
            return res.status(404).json({ msgErr: 'Marca não encontrada.' })
        }

        await marca.destroy()

        res.json({ msg: "Marca excluída do sistema" })

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