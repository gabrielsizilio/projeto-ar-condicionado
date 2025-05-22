const { io } = require('../http');
const ArCondicionado = require('../models/ArCondicionado')
const ArCondicionadoService = require('../services/ArCondicionadoService')
const Modelo = require('../models/Modelo')
const Temperatura = require('../models/Temperatura')
const { registerLogUpdateTemperatura } = require('./logService')
const estadoArService = require("../services/estadoArService");


class SocketService {


    async setup(esp, socket, macAddressMapping) {
        console.log(`Controlador registrado: ${esp.macAddress}`)
        macAddressMapping[esp.macAddress] = socket.id
        console.log(macAddressMapping);
        await this.setBlockedPins(esp.macAddress, socket.id, macAddressMapping);
        this.checkModuleConnectionStatus(esp.macAddress, macAddressMapping, socket);
    }

    async setBlockedPins(macAddress, socket_id) {
        const blockedPins = await ArCondicionadoService.getBlockedIRPins(macAddress);

        io.to(socket_id).emit('AddBlockedEmissors', blockedPins);
    }

    async enviaComando(comandoParm, macAddressMapping) {
        const { user } = comandoParm;

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..");
        console.log(comandoParm.id_controlador);


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

        if (user) await registerLogUpdateTemperatura(comandoParm);
        await estadoArService.createOrUpdateAr(aparelho.id, temperatura);

        io.emit("airConditionerTemperatureResponse", { ar_id: aparelho.id, temperature: temperatura });
    }

    checkModuleConnectionStatus(macAddress, macAddressMapping, socket) {
        const isModuleConnected = macAddressMapping[macAddress] ? true : false;
        socket.emit('moduleConnectionStatus', { isModuleConnected, macAddress });
    }

    async getAirConditionerTemperature(data, socket) {
        try {
            const { ar_id } = data;
            const temperature = await ArCondicionadoService.getTemperature(ar_id);
            socket.emit("airConditionerTemperatureResponse", { ar_id, temperature });
        } catch (error) {
            console.log(error);
        }
    }

    disconnect(socket, macAddressMapping) {
        console.log(`Usuário desconectado { id: ${socket.id} }`)

        Object.entries(macAddressMapping).forEach(([id_controlador, socketId]) => {
            if (socketId == socket.id) {
                delete macAddressMapping[id_controlador];
                console.log(`Controlador desconectado: ${id_controlador}`);
                this.checkModuleConnectionStatus(id_controlador, macAddressMapping, io);
            }
        });

        console.log(macAddressMapping);

    }
}

module.exports = new SocketService()
