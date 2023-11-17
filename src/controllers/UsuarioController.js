const Usuario = require('../models/Usuario')
const CredencialController = require('../controllers/CredencialController')
const Credencial = require('../models/Credencial')

module.exports = {


    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll({ include: [{ model: Credencial, as: 'credencial' }] })
            res.json({ usuarios })
        } catch (error) {
            res.send(`Erro: ${error}`)

        }
    },

    async create(req, res) {
        const { nome } = req.body

        if (!nome) {
            res.status(404).json({ mensagem: "Nome é obrigatório" })
        }

        const { credencial } = await CredencialController.create(req, res)

        try {
            const usuario = new Usuario({
                nome: nome,
                credencial_id: credencial.id
            })

            await usuario.save()

            await usuario.reload({ include: [{ model: Credencial, as: 'credencial' }] })
            res.status(201).json({ usuario })
        } catch (error) {
            res.send(`Erro: ${error}`)
        }
    }


}