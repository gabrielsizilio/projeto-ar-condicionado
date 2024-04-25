const authenticationMiddleware = require("./authMiddleware");

const authMiddleware = (req, res, next) => {
    if(req.cookies.jwt) {
        authenticationMiddleware(req, res, next);
    } else {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/login');
        }
    }
};

module.exports = authMiddleware;
