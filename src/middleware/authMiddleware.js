const { checkToken } = require('../config/auth')

function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    if(!authHeader) {
        return res.status(401).json({ msg: "Token não fornecido!" })
    }
    
    const token = authHeader.split(" ")[1]
    
    if (!token) {
        return res.status(401).json({ msg: "Token não fornecido!" })
    }
    
    const payload = checkToken(token)

    if (!payload) {
        return res.status(401).json({ msg: "Token inválido!" })
    }

    req.credencial = payload
    next()
}

module.exports = authenticationMiddleware