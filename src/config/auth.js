require('dotenv').config()
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
const Role = require('../models/Role')

async function createToken(credencial) {

    const secret = process.env.AUTH_TOKEN_SECRET
    const option = { expiresIn: `${process.env.AUTH_EXPIRE_TOKEN}s` }

    try {
        const user = await Usuario.findOne({
            where: { credencial_id: credencial.id }
        });

        const userRole = await user.getRole();

        const payload = {
            id: credencial.id,
            role: userRole.nome
        }
        
        const token = jwt.sign(payload, secret, option);
        return token;
    } catch (error) {
        console.error('Erro ao criar o token:', error);
        return error;
    }
}

function checkToken(token) {
    const secret = process.env.AUTH_TOKEN_SECRET

    try {
        const payload = jwt.verify(token, secret)
        return payload
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
    }
}

module.exports = { createToken, checkToken }