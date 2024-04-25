const User = require('../models/Usuario')
const Credencial = require('../models/Credencial')
const Predio = require('../models/Predio');
const { checkToken } = require('../config/auth');
const Usuario = require('../models/Usuario');

async function index(req, res) {

    let userId;
    let credencialId;
    let user;

    if (req.cookies.jwt) {
        credencialId = req.cookies.jwt;
        credencialId = checkToken(credencialId).id;

        const credencial = await Credencial.findByPk(credencialId,
            {
                include: [
                    { association: 'usuario' }
                ]
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

    try {

        if (!user) {
            return res.redirect('/logout')
        }

        const predios = await Predio.findAll({
            include: [
                {
                    association: 'salas',
                    include: [
                        {
                            association: 'ares_condicionados',
                            include: [
                                {
                                    association: 'modelo'

                                },
                                {
                                    association: 'controlador'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        console.log(predios)

        console.log("Modelo: ");
        // console.log(predios[0].salas[0].ares_condicionados[0].modelo);
        console.log("Controlador: ");
        // console.log(predios[0].salas[0].ares_condicionados[0].controlador);

        res.status(200).render('home/index', { user, predios })

    } catch (error) {
        console.error('Ocorreu um erro: ', error);
        return res.redirect('/logout')
    }

}

module.exports = {
    index
}