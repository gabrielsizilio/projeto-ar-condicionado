const express = require('express')
require('dotenv').config()
require('./database')

const router = require('./routes/route')

const app = express()

app.use(express.json())
app.use('/', router);


app.listen(process.env.PORT || 8989)