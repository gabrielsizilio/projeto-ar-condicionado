const Modelo = require('../models/Modelo')
const Marca = require('../models/Marca')


async function index(req, res) {
    const modelos = await Modelo.findAll({
        include: [{ model: Marca, as: 'marca' }],
        order: [[{ model: Marca, as: 'marca' }, 'nome', 'ASC']]
    })

    return res.json(modelos)
    // return res.render('/arCondicionado/index')
}

async function create(req, res) {

}

async function store(req, res) {
    const { nome, marca_id } = req.body

    if (!nome || !marca_id) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        const marca = Marca.findByPk(marca_id)

        if (!marca) {
            return res.status(404).json({ msgErr: 'Marca não encontrada no banco.' })
        }

        const modelo = await Modelo.create({
            nome,
            marca_id
        })

        return res.json(modelo)
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function edit(req, res) {
    const modelo_id = req.params

    try {
        const modelo = await Modelo.findOne({
            where: { id: modelo_id.id },
            include: [{ model: Marca, as: 'marca' }]
        })

        if (!modelo) {
            return res.status(404).json({ msgErr: 'Modelo não cadastrado no sistema' })
        }

        return res.json(modelo)
    } catch (error) {
        console.log(error)
    }
}


async function update(req, res) {
    const modelo_id = req.params
    const { nome, marca_id } = req.body

    if (!nome || !marca_id) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    if (!modelo_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual modelo será editado.' })
    }
    
    const marca = await Marca.findOne({
        where: { id: marca_id }
    })

    if (!marca) {
        return res.status(404).json({ msgErr: 'Marca não encontrada no banco.' })
    }
    try {
        const modelo = await Modelo.findOne({
            where: { id: modelo_id.id }
        })
    
        if (!modelo) {
            return res.status(404).json({ msgErr: 'Modelo não encontrado no banco.' })
        }

        await modelo.update({
            nome,
            marca_id
        })

        return res.status(200).json({ modelo })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

async function remove(req, res) {
    const modelo_id = req.params

    if (!modelo_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual marca será removida.' })
    }

    try {
        const modelo = await Modelo.findByPk(modelo_id.id)

        if (!modelo) {
            return res.status(404).json({ msgErr: 'Modelo não encontrado.' })
        }

        await modelo.destroy()

        res.json({ msg: "Modelo excluído do sistema" })

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