const Log = require("../models/Log")
const Usuario = require("../models/Usuario")

async function index(req, res) {
    const logs = await Log.findAll({
        include: {
            model: Usuario, as: 'usuario'
        }
    });

    return res.status(200).render('../views/log/index', { logs })
}

module.exports = {
    index
}
