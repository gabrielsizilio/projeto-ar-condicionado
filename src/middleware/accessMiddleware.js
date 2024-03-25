const { checkToken } = require("../config/auth");
const Usuario = require("../models/Usuario");

function access(allowedRoles) {
    return async (req, res, next) => {
        const token = req.cookies.jwt
        const payload = checkToken(token)

        const hasAccess = allowedRoles.includes(payload.role)
        
        if(hasAccess) {
            return next()
        } else {
            return res.status(401).json({ error: 'Acesso negado. Você não tem permissão para acessar esta rota.' });
        }
    }
}

module.exports = access