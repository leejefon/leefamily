/**
 * Home Controller
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

var Passport = require('passport');

module.exports = (function () {

    function index (req, res) {
        return res.view();
    }

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

    return {
        index: index,
        login: login,
        logout: logout,
        reset_password: reset_password
    };
})();
