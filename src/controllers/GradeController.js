const User = require('../models/Usuario')
const Predio = require('../models/Predio')
const Semana = require('../models/Semana')
const AlocacaoHorario = require('../models/AlocacaoHorario')
const Horario = require('../models/Horario')

async function index(req, res) {

    const usuarios  = await User.findAll({include: [{association: 'credencial'}]})
    const predios = await Predio.findAll({
        include: { association: 'salas' }
    })
    const semana = await Semana.findAll()
    const horarios = await Horario.findAll()
    const alocaoHorarios = await AlocacaoHorario.sequelize.query("SELECT * FROM alocacao_horarios")
    
    try {
        res.status(200).render('grade/index', {usuarios, predios, semana, horarios, alocaoHorarios})
    } catch (error) {
        console.error('Ocorreu um erro: ', error);
    }

}

module.exports = {
    index
}