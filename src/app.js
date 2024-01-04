const express = require('express')
require('dotenv').config()
require('./database')

const app = express()

app.use(express.json())

const router = require('./routes/route')
app.use('/', router);



try {
    app.listen(process.env.PORT || 8989)
    console.log(">> SERVER ON IN PORT: ", (process.env.PORT || 8989))
} catch (error) {
    console.error(">> Erro ao iniciar o servidor: ", error)
}