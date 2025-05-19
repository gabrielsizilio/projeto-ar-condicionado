const Credencial = require('../models/Credencial')
const Predio = require('../models/Predio');
const { checkToken } = require('../config/auth');
const Usuario = require('../models/Usuario');
const Role = require('../models/Role');
const Sala = require('../models/Sala');

async function index(req, res) {

    let userId;
    let credencialId;
    let user;

    if (req.cookies.jwt) {
        credencialId = req.cookies.jwt;
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

    } else if (req.session.passport.user) {
        userId = req.session.passport.user

        user = await Usuario.findByPk(userId,
            {
                include: [
                    { association: 'credencial' }
                ]
            }
        )
    }

    const role = await Role.findByPk(user.role_id, {
        include: [{
            association: 'salas'
        }]
    })
    
    // const authorizedSalas = role.salas.map(sala => sala.id);
    const authorizedSalas = role.salas

    const predios = await Predio.findAll({
        include: [
            {
                association: 'salas',
                required: true,
                include: [{
                    association: 'roles',
                    // where: { id: user.role_id}
                    where: role.nome === "Manutenção" ? {} : { id: user.role_id },
                    required: role.nome !== "Manutenção",
                },
                {
                    association: 'ares_condicionados',
                    include: [
                        {
                            association: 'modelo'
                        },
                        {
                            association: 'controlador'
                        },
                        {
                            association: "estado"
                        }
                    ]
                }]
            }
        ]
    });

    res.status(200).render('home/index', { user, predios })
    // res.status(200).render('home/index', { user, predios, authorizedSalas })
}

module.exports = {
    index
}