const ArCondicionado = require("../models/ArCondicionado");
const Controlador = require("../models/Controlador");
const { io } = require('../http');
const EstadoAr = require("../models/EstadoAr");
class ArCondicionadoService {
    static async setIRBlockState(arCondicionadoId, isBlocked, macAddressMapping) {
        const airConditioner = await ArCondicionado.findByPk(arCondicionadoId, {
            include: [
                {
                    model: Controlador,
                    as: "controlador",
                },
            ],
        });

        if (!airConditioner) {
            throw new Error("Ar-condicionado não encontrado");
        }

        airConditioner.irBlocked = isBlocked;

        await airConditioner.save();

        const macAddress = airConditioner.controlador.macAddress;

        if (!macAddress) return;
        
        const socket_id =
            macAddressMapping[macAddress];

        if (!socket_id) return; 

        const blockedPins = await this.getBlockedIRPins(macAddress);

        io.to(socket_id).emit('AddBlockedEmissors', blockedPins);   
        
    }

    static async getBlockedIRPins(macAddress) {
        if (!macAddress) return [];

        const blockedAirConditioners = await ArCondicionado.findAll({
            where: { irBlocked: true },
            include: [
                {
                    model: Controlador,
                    as: "controlador",
                    where: { macAddress },
                },
            ],
        });

        return blockedAirConditioners.map(
            (airConditioner) => airConditioner.pinEmissor
        );
    }

    static async getTemperature(id) {
        if (!id) throw new Error("O ID é obrigatório.");

        const airState = await EstadoAr.findByPk(id);

        if (!airState) throw new Error("Ar-condicionado não encontrado");
        if (!airState.temp) return "off";

        return airState.temp;
        
    }
}

module.exports = ArCondicionadoService;
