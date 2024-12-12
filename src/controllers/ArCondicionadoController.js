const ArCondicionado = require('../models/ArCondicionado')
const Modelo = require('../models/Modelo')
const Marca = require('../models/Marca')
const Controlador = require('../models/Controlador')
const ArCondicionadoService = require('../services/ArCondicionadoService')
const macAddressMapping = require("../websocket");


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
    const {
        nome,
        marca_id,
        modelo_id: reqModeloId,
        controlador_id: reqControladorId,
        pinEmissor,
        sala_id,
        nomeNovoModelo,
        macAdressNovoControlador,
    } = req.body;
    let controlador_id = reqControladorId;
    let modelo_id = reqModeloId;

    if (!nome || !pinEmissor || sala_id) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        if (nomeNovoModelo) {
            const marca = await Marca.findByPk(marca_id);
            if (!marca) {
                return res.status(404).json({ msgErr: 'Marca não encontrada.' });
            }

            const modelo = await Modelo.create({ 
                nome: nomeNovoModelo,
                marca_id
            })

            modelo_id = modelo.id
        }

        if (macAdressNovoControlador) {
            const controlador = await Controlador.create({
                macAddress: macAdressNovoControlador
            })
            controlador_id = controlador.id
        }

        if (!controlador_id) {
            return res.status(404).json({ msgErr: 'O id do controlador é obrigatório!' });
        }

        if (!modelo_id) {
            return res.status(404).json({ msgErr: 'O id do modelo é obrigatório!' });
        }

        await ArCondicionado.create({
            nome,
            modelo_id,
            sala_id,
            controlador_id,
            pinEmissor
        });

        return res.status(200).redirect('back')
    } catch (error) {
        console.log(error);
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
    const arId = req.params.id
    const {
        nome,
        marca_id,
        modelo_id: reqModeloId,
        controlador_id: reqControladorId,
        pinEmissor,
        nomeNovoModelo,
        macAdressNovoControlador,
    } = req.body;
    let controlador_id = reqControladorId;
    let modelo_id = reqModeloId;

    if (!nome || !pinEmissor) {
        return res.status(400).json({ msgErr: 'Campos obrigatórios não preenchidos.' })
    }

    try {
        const arCondicionado = await ArCondicionado.findOne({
            where: { id: arId },
            include: [{ model: Modelo, as: 'modelo' }]
        })

        if (!arCondicionado) {
            return res.status(404).json({ msgErr: 'Ar-condicionado não encontrado.' })
        }

        if (nomeNovoModelo) {

            const marca = await Marca.findByPk(marca_id);

            if (!marca) {
                return res.status(404).json({ msgErr: 'Marca não encontrada.' });
            }

            const modelo = await Modelo.create({
                nome: nomeNovoModelo,
                marca_id
            })

            modelo_id = modelo.id
        }

        if (macAdressNovoControlador) {

            const controlador = await Controlador.create({
                macAddress: macAdressNovoControlador
            })

            controlador_id = controlador.id
        }

        await arCondicionado.update({
            nome,
            modelo_id,
            controlador_id,
            pinEmissor
        })

        return res.status(200).redirect('back')

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

async function setIRBlockState(req, res) {
    const arCondicionadoId = req.params.id;
    const { irBlocked } = req.body;
    
    try {
        await ArCondicionadoService.setIRBlockState(arCondicionadoId, irBlocked, macAddressMapping);
        res.status(200).send('Estado do IR atualizado');
    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

async function remove(req, res) {
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual o ar-condicionado a ser removido.' })
    }

    try {
        const arCondicionado = await ArCondicionado.findByPk(id)

        if (!arCondicionado) {
            return res.status(404).json({ msgErr: 'Ar-condicionado não encontrado.' })
        }

        await arCondicionado.destroy()

        return res.status(200).redirect('back')


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
    remove,
    setIRBlockState
}