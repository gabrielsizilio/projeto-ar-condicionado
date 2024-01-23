const { io } = require('./http')

const controladorSockets = {}

io.on('connection', (socket) => {
    console.log(`Um usuário se conectou { id: ${socket.id} }`)
    
    socket.on('registrarControlador', (id_controlador) => {
        console.log(`Controlador registrado: ${id_controlador}`)
        controladorSockets[id_controlador] = socket.id
        console.log(controladorSockets);
    })
    
    socket.on('enviarComandoAr', (comando) => {
        console.log(comando);

        const codigo_ir = [];
        // Buscar Código IR para cada Ar condicionado

        // codigo_ir.push()
        // codigo_ir.push()

        if(!controladorSockets[comando.id_controlador]) {
            console.log("Deu Ruim controlador não encontrado");
            // Precisa tratar o erro corretamente
            return;
        }

        io.to(controladorSockets[comando.id_controlador]).emit('EnviaIR',codigo_ir);
    })
    
    socket.on('disconnect', () => {
        console.log(`Usuário desconectado { id: ${socket.id} }`)

        Object.keys(controladorSockets).forEach(id_controlador => {
            if(controladorSockets[id_controlador] == socket.id) {
                delete controladorSockets[id_controlador]
            }
        });
        console.log(controladorSockets);
    })
});
