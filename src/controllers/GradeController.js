const User = require('../models/Usuario')
const Predio = require('../models/Predio')
const Semana = require('../models/Semana')
const AlocacaoHorario = require('../models/AlocacaoHorario')
const Horario = require('../models/Horario')
const Sala = require('../models/Sala')
const Usuario = require('../models/Usuario')

async function index(req, res) {

    const usuarios = await User.findAll({ include: [{ association: 'credencial' }] })
    const predios = await Predio.findAll({
        include: {
            model: Sala, as: 'salas', include: [{
                model: AlocacaoHorario, as: 'alocacoes'
            }]
        }
    })
    const alocacaoHorarios = await AlocacaoHorario.findAll({
        include: [{
            model: Usuario, as: 'usuario'
        }]
    })

    const semana = await Semana.findAll()
    const horarios = await Horario.findAll()

    try {
        res.status(200).render('grade/index', { usuarios, predios, semana, horarios, alocacaoHorarios })
    } catch (error) {
        console.error('Ocorreu um erro: ', error);
    }

}

module.exports = {
    index
}