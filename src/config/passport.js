const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/Usuario');

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

            try {
                let user = await User.findOne({ google_id: profile.id });
                if (user) {
                    done(null, user);
                } else {
                    // TODO: criar um novo usuário
                    // user = await User.create(newUser);
                    // done(null, user);
                }
            } catch (err) {
                console.error(err);
            }
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser( async(id, done) => {
        await User.findByPk(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    });
};
