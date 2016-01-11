/**
 * User Controller
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

var fs = require('fs');
var btoa = require('btoa');

module.exports = (function () {

    function list (req, res) {
        UserService.list(function (err, users) {
            return res.json(users);
        });
    }

    function getByName (req, res) {
        var name = req.params.name;

        UserService.getByName(name, function (er, user) {
            return res.json(user);
        });
    }

    function add (req, res) {
        var newUser = req.body;

        UserService.add(newUser, function (err, user) {
            return res.json(user);
        });
    }

    function update (req, res) {
        var id = req.params.id;
        var newData = req.body;

        UserService.update(id, newData, function (err, result) {
            return res.json(result);
        });
    }

    function updateAvatar (req, res) {
        var id = req.params.id;

        if (!req.file('avatar').isNoop) {
            req.file('avatar').upload(function (err, files) {
                fs.readFile(files[0].fd, function (err, data) {
                    UserService.update(id, {
                        avatar: files[0].type + '@' + btoa(data)
                    }, function (err, result) {
                        return res.json({
                            avatar: btoa(data),
                            type: files[0].type
                        });
                    });
                });
            });
        } else {
            // TODO: send HTTP 500 error or something
            return res.json({
                status: 'ERROR'
            });
        }
    }

    function remove (req, res) {
        var id = req.body.id;
        return res.json({});
    }

    return {
        list: list,
        getByName: getByName,
        add: add,
        update: update,
        updateAvatar: updateAvatar,
        remove: remove
    };
})();
