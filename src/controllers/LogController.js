const { checkToken } = require("../config/auth");
const Credencial = require("../models/Credencial");
const Log = require("../models/Log")
const Usuario = require("../models/Usuario")

async function index(req, res) {
    const logs = await Log.findAll({
        include: {
            model: Usuario, as: 'usuario'
        }
    });

    let credencialId = req.cookies.jwt;
    credencialId = checkToken(credencialId).id;
    const credencial = await Credencial.findByPk(credencialId,
        {
            include: [{
                model: Usuario,
                as: 'usuario',
            }]
        }
    )

    user = credencial.usuario;

    return res.status(200).render('../views/log/index', { user, logs })
}

module.exports = {
    index
}
