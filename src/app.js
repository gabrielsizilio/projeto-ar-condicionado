const express = require('express')
require('dotenv').config()
require('./database')

const path = require('path');

const router = require('./routes/route')

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, "views"));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', router);

const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
    console.log(`Server is running in address http://localhost:${PORT}`);
    console.log("To stop press CTRL + C.")
})