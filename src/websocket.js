const { io } = require('./http')

const controladorSockets = {}

const ArCondicionado = require('./models/ArCondicionado')
const Modelo = require('./models/Modelo')
const Temperatura = require('./models/Temperatura')



io.on('connection', (socket) => {
    console.log(`Um usuário se conectou { id: ${socket.id} }`)

    socket.on('registrarControlador', (id_controlador) => {
        console.log(`Controlador registrado: ${id_controlador}`)
        controladorSockets[id_controlador] = socket.id
        console.log(controladorSockets);
    })

    socket.on('enviarComandoAr', async (comando) => {
        console.log(comando);

        var aparelho = await ArCondicionado.findOne({
            include: [{
                model: Modelo, as: 'modelo',
                include: [{
                    model: Temperatura, as: 'temperatura'
                }]
            }]
        });

        var temp16 = aparelho.modelo.temperatura.temp16;
        
        const codigo_ir = [];
        // Buscar Código IR para cada Ar condicionado
        
        codigo_ir.push(temp16)
        console.log(codigo_ir[0]);
        // codigo_ir.push()

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
