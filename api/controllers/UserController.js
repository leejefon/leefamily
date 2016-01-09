/**
 * User Controller
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

var Passport = require('passport');

module.exports = (function () {

    function login (req, res) {
        Passport.authenticate('local', function (err, user) {
            if (err) { return next(err); }
            if (!user) { return res.status(401).json({ error: 'user not found' }); }
            // TODO: store in cookie as well

            delete user.password;
            delete user.password_reset_key;
            req.logIn(user, function (err) {
                if (err) { return res.json(err); }
                return res.json(user);
            });
        })(req, res);
    }

    function logout (req, res) {
        req.logout();
        return res.redirect('/');
    }

    function reset_password (req, res) {

    }

    function add (req, res) {

    }

    function update (req, res) {

    }

    function remove (req, res) {

    }

    return {
        login: login,
        logout: logout,
        reset_password: reset_password,

        add: add,
        update: update,
        remove: remove
    };
})();
