/**
 * Passport
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

Passport.serializeUser(function (user, done) {
    done(null, user);
});

Passport.deserializeUser(function (user, done) {
    done(null, user);
});

Passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, function (req, email, password, done) {
    User.findOne({ email: email }).then(function (user) {
        if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect username/password' }); }

        bcrypt.compare(password, user.password, function (err, res) {
            if (!res) return done(null, false, { message: 'Invalid Password' });
            return done(null, user);
        });
    });
}));

module.exports = {
    http: {
        customMiddleware: function (app) {
            app.use(Passport.initialize());
            app.use(Passport.session());
        }
    }
};
