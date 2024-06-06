const { io } = require('./http')

const macAddressMapping = {}
const SocketController = require('./controllers/SocketController');


io.on('connection', (socket) => {
    console.log(`Um usuário se conectou { id: ${socket.id} }`)

    socket.on('setup', (esp) => { SocketController.setup(esp, socket, macAddressMapping) });

    socket.on('enviarComandoAr', async (comando, user) => { SocketController.enviaComando(comando, macAddressMapping , io) });

    socket.on('disconnect', () => { SocketController.disconnect(socket, macAddressMapping) });

});
