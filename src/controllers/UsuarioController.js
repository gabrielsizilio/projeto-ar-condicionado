const Usuario = require('../models/Usuario')
const CredencialController = require('../controllers/CredencialController')
const Credencial = require('../models/Credencial')

module.exports = {


    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll({ include: [{ association: 'credencial' }] })
            res.status(200).json({ usuarios })
        } catch (error) {
            res.send(`Erro: ${error}`)

        }
    },

    async create(req, res) {
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json({ mensagem: "Nome é obrigatório" })
        }

        const { credencial } = await CredencialController.create(req, res)
        try {
            const usuario = await Usuario.create({
                nome: nome,
                credencial_id: credencial.id
            })

            return res.status(201).json({ usuario })
        } catch (error) {
            return res.send(`>>>Erro: ${error}`)
        }
    }


}