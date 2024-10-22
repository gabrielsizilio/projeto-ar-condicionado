const { checkToken } = require("../config/auth");
const Role = require("../models/Role");
const Usuario = require("../models/Usuario");

function access(allowedRoles) {
    return async (req, res, next) => {

        let hasAccess = false;

        if (req.cookies.jwt) {
            const token = req.cookies.jwt;
            const payload = checkToken(token);

            const user = await Usuario.findByPk(payload.user_id, {
                include: [{ association: 'role' }]
            });

            hasAccess = allowedRoles.includes(user.role.nome);
        } else if (req.user) {
            const role = await Role.findByPk(req.user.role_id);

            hasAccess = allowedRoles.includes(role.nome);
        }

        if (hasAccess) {
            return next()
        } else {
            return res.redirect('/');
            // return res.status(401).json({ error: 'Acesso negado. Você não tem permissão para acessar esta rota.' });
        }
    }
}

module.exports = access