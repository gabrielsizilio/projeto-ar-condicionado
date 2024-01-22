const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./database')

const router = require('./routes/route')

const app = express()
const server = http.createServer(app)
const port = (process.env.PORT ? process.env.PORT : 8081)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transports: ["websocket", "polling"],
        credentials: true,
    },
    allowEIO3: true,
});

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/', router);


io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);

    socket.on("event_name", (now) => {
        console.log("now: "+ now.now);
    });
    
    socket.on('button', () => {
        io.emit('button');
        console.log('the user click in the button');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

try {
    server.listen(port)
    console.log(`>> SERVER ON: http://127.0.0.1:${port}`)
} catch (error) {
    console.error(">> Erro ao iniciar o servidor: ", error)
}
