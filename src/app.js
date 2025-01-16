const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport')
const { app } = require('./http')
const { server } = require('./http')
const flash = require('connect-flash')
require('dotenv').config()
require('./database')
require('./websocket')
require('./services/CronService')

const authRoutes = require('./routes/authRoutes');
require('./config/passport')(passport)

const router = require('./routes/route')
const port = (process.env.PORT ? process.env.PORT : 8081)

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: process.env.SESSION_EXPIRE*1 },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

app.use('/auth/google', authRoutes);
app.use('/', router);

try {
    server.listen(port)
    console.log(`>> SERVER ON: http://127.0.0.1:${port}`)
} catch (error) {
    console.error(">> Erro ao iniciar o servidor: ", error)
}
