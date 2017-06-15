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

            res.cookie('user', JSON.stringify(_.pick(user, ['id', 'name', 'email', 'role'])));
            req.logIn(user, function (err) {
                if (err) { return res.json(err); }
                return res.json(_.pick(user, ['id', 'name', 'email', 'role']));
            });
        })(req, res);
    }

    function logout (req, res) {
        req.logout();
        res.clearCookie('user');
        return res.json();
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
