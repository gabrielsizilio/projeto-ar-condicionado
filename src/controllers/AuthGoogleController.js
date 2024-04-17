const passport = require('passport');

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/login' });

const googleAuthCallbackSuccess = (req, res) => {
    res.redirect('/');
};

const logout = (req, res) => {
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