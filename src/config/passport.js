const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Role = require('../models/Role');
const Usuario = require('../models/Usuario');
const { createUsuario } = require('../services/usuarioService');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value
            };

            if (newUser.email.endsWith('ifnmg.edu.br')) {
                try {
                    let user = await Usuario.findOne({ where: { google_id: profile.id } });
                    
                    if (user) {
                        done(null, user);
                    } else {
                        user = await createUsuario(profile);

                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }

            } else {
                return done(null, false, { message: 'Endereço de e-mail não autorizado para acessar o sistema.' });
            }
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        await Usuario.findByPk(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    });
};
