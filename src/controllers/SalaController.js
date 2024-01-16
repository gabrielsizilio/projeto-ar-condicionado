const Predio = require('../models/Predio')
const Sala = require('../models/Sala')


async function index(req, res) {
    const salas = await Sala.findAll()

    res.status(200).json({ salas })
}

async function create(req, res) {

}

async function store(req, res) {
    const { nome, predio_id } = req.body

    if (!nome || !predio_id) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        await Sala.create({
            nome,
            predio_id
        })

        res.redirect('/ar-condicionado')
    } catch (error) {
        res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
    }
}

async function edit(req, res) {
    const sala_id = req.params

    try {
        const sala = await Sala.findOne({
            where: { id: sala_id.id },
            include: [{ model: Predio, as: 'predio' }]
        })

        const predios = await Predio.findAll();

        if (!sala) {
            return res.status(404).json({ msgErr: 'Sala não cadastrada no sistema' })
        }

        return res.json(sala, predios)
    } catch (error) {
        console.log(error)
    }
}

async function update(req, res) {
    const sala_id = req.params
    const { nome, predio_id } = req.body

    if (!nome || !predio_id) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    if (!sala_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual sala será editada.' })
    }

    try {
        const sala = await Sala.findByPk(marca_id.id)

        if (!sala) {
            return res.status(404).json({ msgErr: 'Sala não encontrado.' })
        }

        await sala.update({
            nome,
            predio_id
        })

        return res.status(200).json({ sala })

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

async function remove(req, res) {
    const sala_id = req.params

    if (!sala_id.id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual sala será removida.' })
    }

    try {
        const sala = await Sala.findByPk(sala_id.id)

        if (!sala) {
            return res.status(404).json({ msgErr: 'Sala não encontrada.' })
        }

        await sala.destroy()

        res.json({ msg: "Sala excluída do sistema" })

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