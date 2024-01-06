const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Credencial = require('../models/Credencial')
const { createToken } = require('../config/auth')

function index(req, res) {
    return res.render('login')
}

async function login(req, res) {
    const { email, senha } = req.body
    // const email = req.body.email
    // const senha = req.body.senha

    if (!email) {
        res.status(401).json({ msgErr: "Email é obrigatório!" })
    }

    if (!senha) {
        res.status(401).json({ msgErr: "Senha é obrigatório!" })
    }

    try {
        const credencial = await Credencial.findOne({ where: { email } })

        if (!credencial) {
            return res.status(404).json({ errorEmail: "Usuário não cadastrado" });
        }

        const senhaHash = (await bcrypt.compare(senha, credencial.senha))

        if (senhaHash) {
            const token = await createToken(credencial)
            if (token == 500) {
                res.status(500).json({ msgErr: "Ocorreu um erro ao criar o token!" })
            } else {
                // res.header('Authorization', `Bearer ${token}`);
                res.cookie('jwt', token, {/*secure: true,*/ httpOnly: true, maxAge: process.env.AUTH_EXPIRE_TOKEN * 1000 })
                res.status(200).json({ msg: "Logado com sucesso!", success: true })

                // return res.redirect('/')
            }

        } else {
            return res.status(404).json({ errorSenha: "Senha inválida!" });
        }

    } catch (error) {
        return res.status(500).json({ msgErr: "Ocorreu um erro! ", error });
    }
}

module.exports = {
    login,
    index
}