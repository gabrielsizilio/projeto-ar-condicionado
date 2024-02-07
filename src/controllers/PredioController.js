const Predio = require('../models/Predio')
const Sala = require('../models/Sala')


async function index(req, res) {

    const predios = await Predio.findAll({
        include: {association: 'salas'}
    })

    res.status(200).render('predio/index' ,{ predios });
}

async function create(req, res) {

}

async function store(req, res) {
    const { nome } = req.body

    return res.send(req.body)

    if (!nome) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        await Predio.create({
            nome
        })

        res.redirect('/ar-condicionado')
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function edit(req, res) {
    const predio_id = req.params

    try {
        const predio = await predio.findByPk(predio_id.id)

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
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    if (!predio_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual predio será editado.' })
    }

    try {
        const predio = await predio.findByPk(predio_id.id)

        if (!predio) {
            return res.status(404).json({ msgErr: 'Prédio não encontrado.' })
        }

        await predio.update({
            nome
        })

        return res.status(200).json({ predio })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

async function remove(req, res) {
    const predio_id = req.params

    if (!predio_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual predio será removida.' })
    }

    try {
        const predio = await predio.findByPk(predio_id.id)

        if (!predio) {
            return res.status(404).json({ msgErr: 'Prédio não encontrada.' })
        }

        await predio.destroy()

        res.json({ msg: "Prédio excluída do sistema" })

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