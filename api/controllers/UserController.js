/**
 * User Controller
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

var Passport = require('passport');

module.exports = (function () {

    function post_login (req, res) {
        res.cookie('user', JSON.stringify({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }), {});

        return res.redirect('/');
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
        login: Passport.authenticate('local', {
            successReturnToOrRedirect: '/user/post_login',
            failureRedirect: '/login',
            failureFlash: 'Wrong username or password.'
        }),
        post_login: post_login,
        logout: logout,
        reset_password: reset_password,

        add: add,
        update: update,
        remove: remove
    };
})();
