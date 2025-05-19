const { checkToken } = require("../config/auth");
const Credencial = require("../models/Credencial");
const Log = require("../models/Log")
const Usuario = require("../models/Usuario")

async function index(req, res) {

    const page = parseInt(req.query.page) || 1;
    const limit = 20; 
    const offset = (page - 1) * limit;

    const { count, rows: logs} = await Log.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
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

    const totalPages = Math.ceil(count / limit);

    user = credencial.usuario;

    return res.status(200).render('../views/log/index', { logs, totalPages, currentPage: page, })
}

module.exports = {
    index
}
