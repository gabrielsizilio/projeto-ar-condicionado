const ArCondicionado = require('../models/ArCondicionado')
const Log = require('../models/Log')
const Modelo = require('../models/Modelo')
const Temperatura = require('../models/Temperatura')

class SocketController {
    setup(esp, socket, macAddressMapping) {
        console.log(`Controlador registrado: ${esp.macAddress}`)
        macAddressMapping[esp.macAddress] = socket.id
        console.log(macAddressMapping);

    }

    async enviaComando(comando, macAddressMapping, io) {
        const { user } = comando;

        console.log("usuario: " + user.nome);

        var aparelho = await ArCondicionado.findByPk(comando.id_arcondicionado, {
                include: [{
                    model: Modelo, as: 'modelo',
                    include: [{
                        model: Temperatura, as: 'temperatura'
                    }]
                }]
        });

        let codigo_ir;
        let temperatura;

        if(comando.temperatura.trim() != "off"){
            temperatura = "temp" + comando.temperatura.replace('°C', '');
        } else {
            temperatura = "off";
        }

        codigo_ir  = aparelho.modelo.temperatura[temperatura];

        codigo_ir = codigo_ir.split(',').map(numero => parseInt(numero.trim()));

        console.log(codigo_ir.length);
        console.log(codigo_ir);

        if (!macAddressMapping[comando.id_controlador]) {
            console.log("Deu Ruim controlador não encontrado");
            // TODO: tratar o erro corretamente
            // return;
        }
        io.to(macAddressMapping[comando.id_controlador]).emit('EnviaIR', codigo_ir)
        
        await Log.create({
            descricao: "Alterou para temperatura",
            usuario_id: user.id
        })
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
