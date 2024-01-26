const User = require('../models/Usuario')
const Predio = require('../models/Predio')
const Semana = require('../models/Semana')
const AlocacaoHorario = require('../models/AlocacaoHorario')

async function index(req, res) {

    const user = await User.findAll({include: [{association: 'credencial'}]})
    const predios = await Predio.findAll({
        include: { association: 'salas' }
    })
    const semana = await Semana.findAll()
    const alocaoHorarios = await AlocacaoHorario.sequelize.query("SELECT * FROM alocacao_horarios")
    
    try {
        res.status(200).render('grade/index', {user , predios, semana, alocaoHorarios})
    } catch (error) {
        console.error('Ocorreu um erro: ', error);
    }

}

module.exports = {
    index
}