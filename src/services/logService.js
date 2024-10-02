const ArCondicionado = require("../models/ArCondicionado");
const Usuario = require("../models/Usuario");
const Log = require("../models/Log");
const { where } = require("sequelize");
const Sala = require("../models/Sala");

async function registerLogUpdateTemperatura(comandoParm) {
    arCondicionado = await ArCondicionado.findByPk(comandoParm.id_arcondicionado, {
        include: [{
            model: Sala,
            as: 'sala',
            include: [{
                association: 'predio'
            }]
        }]
    });
    user = await Usuario.findByPk(comandoParm.user.id);

    console.log(arCondicionado.sala);

    console.log(`>> Alterou ${arCondicionado.nome}: ${comandoParm.temperatura} na sala ${arCondicionado.sala.nome} - ${arCondicionado.sala.predio.nome}`);

    await Log.create({
        descricao: `Alterou ${arCondicionado.nome}: ${comandoParm.temperatura} na sala ${arCondicionado.sala.nome} - ${arCondicionado.sala.predio.nome}`,
        usuario_id: user.id
    })
}

module.exports = {
    registerLogUpdateTemperatura
}
