const { checkToken } = require('../config/auth');
const authController = require('./AuthController')

const passport = require('passport');

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/login' });

const googleAuthCallbackSuccess = (req, res) => {
    res.redirect('/');
};

const logout = (req, res) => {

    let userId;
    if(req.cookies.jwt) {
        userId = req.cookies.jwt;
        userId = checkToken(userId).id;
        return authController.logout(req, res);

    } else if(req.session.passport.user) {
        userId = req.session.passport.user
    }

    req.logout((err) => {
        if (err) {
            console.error('Erro durante o logout:', err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
};

module.exports = {
    googleAuth,
    googleAuthCallback,
    googleAuthCallbackSuccess,
    logout
}