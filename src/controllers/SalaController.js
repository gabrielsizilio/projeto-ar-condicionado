const Sala = require('../models/Sala')
const Predio = require('../models/Predio')
const ArCondicionado = require('../models/ArCondicionado')
const Controlador = require('../models/Controlador')
const Marca = require('../models/Marca')
const Modelo = require('../models/Modelo')
const PredioService = require('../services/PredioService');
const { checkToken } = require('../config/auth')
const Credencial = require('../models/Credencial')
const Usuario = require('../models/Usuario')
const { getUserByJWT } = require('../services/usuarioService')


async function index(req, res) {
    const { id } = req.params

    const user = await getUserByJWT(req.cookies.jwt);

    const sala = await Sala.findByPk(id, {
        include: [{
            model: Predio, as: 'predio'
        }, {
            model: ArCondicionado, as: 'ares_condicionados',
            include: [{
                model: Controlador, as: 'controlador'
            },{
                model: Modelo, as: 'modelo',
                include: [{
                    model: Marca, as: 'marca'
                }]
            }] 
        }]
    })

    const marcas = await Marca.findAll({
        include: [{
            model: Modelo, as: 'modelos',
        }]
    })

    const controladores = await Controlador.findAll();
    
    return res.status(200).render('salas/index', { user, controladores, sala, marcas })
}

async function create(req, res) {

}

async function store(req, res) {
    const { nome, nomeNovoPredio, gerenciarSala } = req.body
    let { predio } = req.body

    
    if (!nome) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }
    
    try {
        if(nomeNovoPredio) {
            const novoPredio = await PredioService.createPredio(nomeNovoPredio)
            predio = novoPredio.id
        }

        const sala = await Sala.create({
            nome,
            predio_id: predio
        })

        if(gerenciarSala) {
            return res.redirect(`/predio/${sala.predio_id}/sala/${sala.id}`)
        } else {
            return res.redirect('/predio')
        }
    } catch (error) {
        return res.status(500).json({ msgErr: 'Ocorreu um erro: ', error })
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
    const { sala_id } = req.params
    const { nome, nomeNovoPredio, predio: predio_id } = req.body

    if (!nome) {
        return res.status(400).json({ msgErr: 'Campo nome é obrigatório.' })
    }
    if (!predio_id && !nomeNovoPredio) {
        return res.status(400).json({ msgErr: 'É necessário informar o id do prédio.' })
    }

    if (!sala_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual sala será editada.' })
    }

    try {
        let newPredioId = predio_id;
        if (nomeNovoPredio) {
            const novoPredio = await PredioService.createPredio(nomeNovoPredio);
            newPredioId = novoPredio.id;
        }

        const sala = await Sala.findByPk(sala_id)

        if (!sala) {
            return res.status(404).json({ msgErr: 'Sala não encontrado.' })
        }

        await sala.update({
            nome,
            predio_id: newPredioId
        })

        res.redirect('/predio')
        // return res.status(200).json({ sala })

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

        return res.redirect('back')
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