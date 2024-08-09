const jwt = require('jsonwebtoken')
const Role = require("../models/Role")
const Usuario = require("../models/Usuario")
const Credencial = require('../models/Credencial')
const { checkToken } = require('../config/auth')
require('dotenv').config()

async function createUsuario(profile) {
    const role = await Role.findOne({
        where: {
            nome: 'Maker'
        }
    })

    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(profile.emails[0].value, salt)

    const credencial = await Credencial.create({
        email: profile.emails[0].value,
        senha: senhaHash
    })

    const usuario = await Usuario.create({
        nome: profile.name.givenName,
        nickname: profile.displayName,
        google_id: profile.id,
        role_id: role.id,
        credencial_id: credencial.id
    })

    return usuario;
}

async function getUserByJWT(jwt) {

    if (jwt) {
        const credencialId = checkToken(jwt).id;

        const credencial = await Credencial.findByPk(credencialId,
            {
                include: [{
                    model: Usuario,
                    as: 'usuario',
                }]
            }
        )

        const user = credencial.usuario;
        return user;
    }
}

async function getLinkFirstAccess(newUser) {
    const credencial = await Credencial.findByPk(newUser.credencial_id);
    const secret = process.env.FIRST_ACCESS_TK_SECRET;
    const option = { expiresIn: `${process.env.FIRST_ACCESS_TK_EXPIRE}d` }

    const payload = {
        email:credencial.email,
        userName: newUser.nome,
        tipoToken: 'first-access'
    }

    try {
        const token = jwt.sign(payload, secret, option);
        const link = `${process.env.BASEURL}:${process.env.PORT}/firstAccess?token=${token}`

        console.log(">>> ", link);
        
        return link;
    } catch (error) {
        console.error("!! Erro ao gerar link: " + error);
    }
}

async function getUserByLinkHash(token) {
    const secret = process.env.FIRST_ACCESS_TK_SECRET;
    const decoded = jwt.verify(token, secret);

    if (decoded.tipoToken != 'first-access') {
        return res.status(400).json({ message: 'Token inválido.' });
    }

    const user = await Usuario.findOne({
        include:[{
            association: 'credencial',
            where: {
                email: decoded.email
            }
        }]
    })

    return user;
}

module.exports = {
    createUsuario,
    getUserByJWT,
    getLinkFirstAccess,
    getUserByLinkHash
}