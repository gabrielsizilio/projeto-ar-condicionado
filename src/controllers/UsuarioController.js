const Usuario = require('../models/Usuario')
const CredencialController = require('../controllers/CredencialController')
const Credencial = require('../models/Credencial')
const Areas = require('../models/Area')

async function index(req, res) {

    const usuarios = await Usuario.findAll({ include: [{ association: 'credencial' }, {association: 'areas'}] })
    const areas = await Areas.findAll()
    try {
        res.status(200).render('usuarios/index', { usuarios, areas })
    } catch (error) {
        res.send(`Erro: ${error}`)

    }
}

async function store(req, res) {
    const { nome, tipo, nickname, areas } = req.body

    if (!nome || !tipo || !nickname) {
        return res.status(400).json({ msgErr: "Campos obrigatório não preenchidos" })
    }

    const { credencial } = await CredencialController.create(req, res)
    try {
        const usuario = await Usuario.create({
            nome: nome,
            nickname: nickname,
            tipo: tipo,
            credencial_id: credencial.id
        })

        if (areas) {
            areas.forEach(async (areaId) => {
                var area = await Areas.findByPk(areaId)
                if (area) {
                    await usuario.addArea(area)
                } else {
                    return res.send('!> Área não encontrada no banco')   
                }
            });
        }

        res.status(200).redirect('/usuario')
    } catch (error) {
        return res.send(`!> Ocorreu um erro ao cadastrar novo usuário: ${error}`)
    }
}

async function edit(req, res) {

}

async function update(req, res) {
    const usuario_id = req.params.id

    if (!usuario_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual o usuário a ser editado.' })
    }

    const usuario = await Usuario.findOne({
        where: {id : usuario_id},
        include:[{ association: 'credencial' }, {association: 'areas'}]
    })

    if (!usuario) {
        return res.status(400).json({ msgErr: 'Usuário não encontrado no sistema.' })
    }

    res.send(usuario)

    try {
     
    } catch (error) {
        return res.send(`Erro ao atualizar usuário: ${error}`)
    }
    
}

async function remove(req, res) {
    const usuario_id = req.params.id


    if (!usuario_id) {
        return res.status(400).json({ msgErr: 'É necessário informar qual o usuário a ser removido.' })
    }
    const usuario = await Usuario.findByPk(usuario_id)
    const credencial = await Credencial.findByPk(usuario.credencial_id)

    try {
        await credencial.destroy()
        res.set('msg', 'Usuário excluido com sucesso')
        res.redirect('back')
    } catch (error) {
        return res.send(`Erro: ${error}`)
    }

}

module.exports = {
    index,
    store,
    update,
    remove
}