const Credencial = require('../models/Credencial')
const bcrypt = require('bcrypt')

module.exports = {

    async create(req, res) {
        const { email, senha } = req.body

        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        const credencial = new Credencial({
            email,
            senha: senhaHash
        })

        try {
            await credencial.save()

            return {credencial}
        } catch (error) {
            res.send(`Erro: ${error}`)
        }
    },

    async index(req, res) {

        try {
            const credenciais = await Credencial.findAll()
            res.json({ credenciais })
        } catch (error) {
            res.send(`Erro: ${error}`)
        }
    }
}