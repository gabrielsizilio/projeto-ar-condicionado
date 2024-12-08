const { io } = require('./http')

const macAddressMapping = {}
const SocketService = require('./services/SocketService');


io.on('connection', (socket) => {
    console.log(`Um usuário se conectou { id: ${socket.id} }`)

    socket.on('setup', (esp) => { SocketService.setup(esp, socket, macAddressMapping) });

    socket.on('enviarComandoAr', async (comando, user) => { SocketService.enviaComando(comando, macAddressMapping , io) });

    socket.on('disconnect', () => { SocketService.disconnect(socket, macAddressMapping) });

});

module.exports = macAddressMapping;