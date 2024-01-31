const Credencial = require('../models/Credencial')
const bcrypt = require('bcryptjs')

module.exports = {

    async create(req, res) {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({ msgErr: "Campos obrigatório não preenchidos" })
        }

        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        const credencial = new Credencial({
            email,
            senha: senhaHash
        })

        try {
            await credencial.save()
            return { credencial }
        } catch (error) {
            return res.send(`Erro: ${error}`)
        }
    },

    async index(req, res) {

        try {
            const credenciais = await Credencial.findAll({ include: [{ association: 'usuario' }] })
            return res.json({ credenciais })
        } catch (error) {
            return res.send(`Erro: ${error}`)
        }
    }
}