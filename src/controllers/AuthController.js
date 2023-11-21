const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Credencial = require('../models/Credencial')
const { createToken } = require('../config/auth')


async function login(req, res) {
    const { email, senha } = req.body

    if (!email) {
        res.status(401).json({ msg: "Email é obrigatório!" })
    }

    if (!senha) {
        res.status(401).json({ msg: "Senha é obrigatório!" })
    }

    try {
        const credencial = await Credencial.findOne({ where: { email } })

        if (!credencial) {
            return res.status(401).json({ mensagem: "Credenciais não existe no banco!" });
        }

        const senhaHash = (await bcrypt.compare(senha, credencial.senha))

        if (senhaHash) {
            const token = createToken(credencial)
            res.status(200).json({ msg: "Logado com sucesso!", token })
        } else {
            return res.status(401).json({ mensagem: "Credenciais inválidas!" });
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error });
    }
}

module.exports = { login }