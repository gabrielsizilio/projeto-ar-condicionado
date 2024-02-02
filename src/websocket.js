const { io } = require('./http')

const macAddressMapping = {}
const SocketController = require('./controllers/SocketController');

const ArCondicionado = require('./models/ArCondicionado')
const Modelo = require('./models/Modelo')
const Temperatura = require('./models/Temperatura')



io.on('connection', (socket) => {
    console.log(`Um usuário se conectou { id: ${socket.id} }`)

    socket.on('setup', (esp)=> { SocketController.setup(esp, socket, macAddressMapping) });

    socket.on('enviarComandoAr', async (comando)=> { SocketController.enviaComando(comando, macAddressMapping , io) });

    socket.on('disconnect', () => { SocketController.disconnect(socket, macAddressMapping) });

});
