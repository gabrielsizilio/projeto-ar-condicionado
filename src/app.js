const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./database')

const router = require('./routes/route')

const app = express()
const port = (process.env.PORT ? process.env.PORT : 3000)

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/', router);

try {
    app.listen(port)
    console.log(`>> SERVER ON: http://127.0.0.1:${port}`)
} catch (error) {
    console.error(">> Erro ao iniciar o servidor: ", error)
}
