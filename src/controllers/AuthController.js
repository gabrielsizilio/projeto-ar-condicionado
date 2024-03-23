const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Credencial = require('../models/Credencial')
const { createToken } = require('../config/auth')
const Log = require('../models/Log')
const Usuario = require('../models/Usuario')

function index(req, res) {

    return res.render('login')
}

async function login(req, res) {
    const { email, senha } = req.body
    // const email = req.body.email
    // const senha = req.body.senha

    if (!email) {
        return res.status(401).json({ errorEmail: "Email é obrigatório!" })
    }

    if (!senha) {
        return res.status(401).json({ errorSenha: "Senha é obrigatório!" })
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
                
                // TODO: alterar para middleware de logs
                const usuario = await Usuario.findOne({where: {credencial_id: credencial.id}})

                await Log.create({
                    descricao: "Efetuou login",
                    usuario_id: usuario.id
                })

                // res.header('Authorization', `Bearer ${token}`);
                // TODO: colcoar 'secure: true' qnd der deploy
                res.cookie('jwt', token, {/* secure: true,*/ httpOnly: true, maxAge: process.env.AUTH_EXPIRE_TOKEN * 1000 })
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

function logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}

module.exports = {
    login,
    logout,
    index
}