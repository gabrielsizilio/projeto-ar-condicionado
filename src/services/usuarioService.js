const bcrypt = require('bcryptjs')
const Role = require("../models/Role")
const Usuario = require("../models/Usuario")
const Credencial = require('../models/Credencial')

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

module.exports = {
    createUsuario
}