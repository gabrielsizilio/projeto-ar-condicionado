const { checkToken } = require('../config/auth')

function authenticationMiddleware(req, res, next) {
    // const authHeader = req.headers['Authorization']
    const authHeader = req.cookies.jwt
    const token = authHeader
    
    if(!authHeader) {
        // return res.status(401).json({ msg: "Token não fornecido!" })
        return res.redirect('/login')
    }
    
    // const token = authHeader.split(" ")[1]
    
    if (!token) {
        // return res.status(401).json({ msg: "Token não fornecido!" })
        return res.redirect('/login')
    }
    
    const payload = checkToken(token)
    
    if (!payload) {
        return res.status(401).json({ msg: "Token inválido!" })
    }
    
    req.credencial = payload
    next()
}

module.exports = authenticationMiddleware