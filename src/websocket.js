const { io } = require('./http')

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);

    socket.on('button', (temperatura) => {
        
        io.emit('button', temperatura);
        console.log('the user click in the button');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
