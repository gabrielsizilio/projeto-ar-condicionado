const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport')
const { app } = require('./http')
const { server } = require('./http')
require('dotenv').config()
require('./database')
require('./websocket')


// AuthRoutes
const authRoutes = require('./routes/authRoutes');
require('./config/passport')(passport)


// Express
const router = require('./routes/route')
const port = (process.env.PORT ? process.env.PORT : 8081)


app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())


// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: process.env.SESSION_EXPIRE*1 },
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/', router);

try {
    server.listen(port)
    console.log(`>> SERVER ON: http://127.0.0.1:${port}`)
} catch (error) {
    console.error(">> Erro ao iniciar o servidor: ", error)
}
