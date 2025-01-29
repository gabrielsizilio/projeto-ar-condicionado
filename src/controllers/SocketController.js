const ArCondicionado = require('../models/ArCondicionado')
const Modelo = require('../models/Modelo')
const Temperatura = require('../models/Temperatura')
const { registerLogUpdateTemperatura } = require('../services/logService')
const estadoArService = require("../services/estadoArService");


class SocketController {
    setup(esp, socket, macAddressMapping) {
        console.log(`Controlador registrado: ${esp.macAddress}`)
        macAddressMapping[esp.macAddress] = socket.id
        console.log(macAddressMapping);

    }

    async enviaComando(comandoParm, macAddressMapping, io) {
        const { user } = comandoParm;

        console.log("usuario: " + user.nome);

        var aparelho = await ArCondicionado.findByPk(comandoParm.id_arcondicionado, {
            include: [{
                model: Modelo, as: 'modelo',
                include: [{
                    model: Temperatura, as: 'temperatura'
                }]
            }]
        });

        let codigo_ir;
        let temperatura;

        if (comandoParm.temperatura.trim() != "off") {
            temperatura = "temp" + comandoParm.temperatura.replace('°C', '');
        } else {
            temperatura = "off";
        }


        codigo_ir = aparelho.modelo.temperatura[temperatura];

        codigo_ir = codigo_ir.split(',').map(numero => parseInt(numero.trim()));

        console.log(codigo_ir.length);
        console.log(codigo_ir);

        if (!macAddressMapping[comandoParm.id_controlador]) {
            console.log("Deu Ruim controlador não encontrado");
            // TODO: tratar o erro corretamente
            // return;
        }

        let comando = [aparelho.pinEmissor, codigo_ir]
        console.log(comando);
        io.to(macAddressMapping[comandoParm.id_controlador]).emit('EnviaIR', comando);

        await estadoArService.createOrUpdateAr(aparelho.id, temperatura);

        await registerLogUpdateTemperatura(comandoParm);
    }

    disconnect(socket, macAddressMapping) {
        console.log(`Usuário desconectado { id: ${socket.id} }`)

        Object.keys(macAddressMapping).forEach(id_controlador => {
            if (macAddressMapping[id_controlador] == socket.id) {
                delete macAddressMapping[id_controlador]
            }
        });
        console.log(macAddressMapping);
    }
}

module.exports = new SocketController()
