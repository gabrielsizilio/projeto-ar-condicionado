const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./database')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())

const router = require('./routes/route')
app.use('/', router);

try {
    app.listen(process.env.PORT || 8989)
    console.log(">> SERVER ON IN PORT: ", (process.env.PORT || 8989))
} catch (error) {
    console.error(">> Erro ao iniciar o servidor: ", error)
}