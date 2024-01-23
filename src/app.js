const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { app } = require('./http')
const { server } = require('./http')
require('dotenv').config()
require('./database')
require('./websocket')

const router = require('./routes/route')

const port = (process.env.PORT ? process.env.PORT : 8081)

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/', router);


try {
    server.listen(port)
    console.log(`>> SERVER ON: http://127.0.0.1:${port}`)
} catch (error) {
    console.error(">> Erro ao iniciar o servidor: ", error)
}
