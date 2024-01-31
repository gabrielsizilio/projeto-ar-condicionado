const { io } = require('./http')

const controladorSockets = {}

const ArCondicionado = require('./models/ArCondicionado')
const Modelo = require('./models/Modelo')
const Temperatura = require('./models/Temperatura')



io.on('connection', (socket) => {
    console.log(`Um usuário se conectou { id: ${socket.id} }`)

    socket.on('setup', (esp) => {
        console.log(`Controlador registrado: ${esp.macAddress}`)
        controladorSockets[esp.macAddress] = socket.id
        console.log(controladorSockets);
    })

    socket.on('enviarComandoAr', async (comando) => {
        console.log(comando);

        // var aparelho = await ArCondicionado.findOne({
        //     include: [{
        //         model: Modelo, as: 'modelo',
        //         include: [{
        //             model: Temperatura, as: 'temperatura'
        //         }]
        //     }]
        // });

        // var temp16 = aparelho.modelo.temperatura.temp16;
        
        const codigo_ir = [];
        // ['5960, 7044, 608, 1564, 576, 1564, 580, 1564, 580, 1564, 576, 1564, 576, 1568, 576, 1564, 580, 1564, 576, 508, 576, 512, 572, 508, 576, 508, 576, 508, 576, 508, 576, 508, 576, 508, 576, 1564, 576, 1568, 576, 1568, 572, 1568, 576, 1568, 572, 1568, 576, 1568, 572, 1568, 572, 512, 572, 512, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 544, 1600, 544, 1572, 568, 1576, 568, 1572, 544, 1600, 540, 1600, 544, 1596, 544, 1600, 568, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 1576, 568, 1572, 568, 520, 564, 1576, 568, 1572, 568, 1576, 564, 1576, 568, 1576, 564, 520, 564, 520, 564, 1576, 568, 520, 560, 524, 564, 520, 560, 524, 564, 520, 560, 524, 560, 1580, 564, 1580, 560, 524, 560, 1580, 564, 520, 560, 1584, 560, 1584, 556, 1584, 536, 548, 536, 548, 536, 1608, 556, 528, 556, 1588, 532, 552, 528, 556, 528, 556, 528, 1612, 532, 576, 508, 1632, 508, 576, 508, 1636, 508, 576, 508, 576, 508, 1632, 508, 576, 508, 1636, 508, 576, 508, 1636, 504, 580, 504, 1636, 508, 1636, 504, 7160, 504'];
        // Buscar Código IR para cada Ar condicionado

        const stringNumeros = '5960, 7044, 608, 1564, 576, 1564, 580, 1564, 580, 1564, 576, 1564, 576, 1568, 576, 1564, 580, 1564, 576, 508, 576, 512, 572, 508, 576, 508, 576, 508, 576, 508, 576, 508, 576, 508, 576, 1564, 576, 1568, 576, 1568, 572, 1568, 576, 1568, 572, 1568, 576, 1568, 572, 1568, 572, 512, 572, 512, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 548, 536, 544, 1600, 544, 1572, 568, 1576, 568, 1572, 544, 1600, 540, 1600, 544, 1596, 544, 1600, 568, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 544, 540, 1576, 568, 1572, 568, 520, 564, 1576, 568, 1572, 568, 1576, 564, 1576, 568, 1576, 564, 520, 564, 520, 564, 1576, 568, 520, 560, 524, 564, 520, 560, 524, 564, 520, 560, 524, 560, 1580, 564, 1580, 560, 524, 560, 1580, 564, 520, 560, 1584, 560, 1584, 556, 1584, 536, 548, 536, 548, 536, 1608, 556, 528, 556, 1588, 532, 552, 528, 556, 528, 556, 528, 1612, 532, 576, 508, 1632, 508, 576, 508, 1636, 508, 576, 508, 576, 508, 1632, 508, 576, 508, 1636, 508, 576, 508, 1636, 504, 580, 504, 1636, 508, 1636, 504, 7160, 504';

        let numeros = stringNumeros.split(',').map(numero => parseInt(numero.trim()));

        console.log(numeros.length);
        console.log(numeros);

        // codigo_ir.push(temp16)
        // console.log(codigo_ir[0]);
        codigo_ir.push(numeros)

        if (!controladorSockets[comando.id_controlador]) {
            console.log("Deu Ruim controlador não encontrado");
            // Precisa tratar o erro corretamente
            return;
        }

        io.to(controladorSockets[comando.id_controlador]).emit('EnviaIR', codigo_ir);
    })

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado { id: ${socket.id} }`)

        Object.keys(controladorSockets).forEach(id_controlador => {
            if (controladorSockets[id_controlador] == socket.id) {
                delete controladorSockets[id_controlador]
            }
        });
        console.log(controladorSockets);
    })
});
