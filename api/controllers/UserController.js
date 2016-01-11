/**
 * User Controller
 *
 * @author  :: Jeff Lee
 * @created :: 2016/01/08
 */

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
        var id = req.body.id;
        var newData = req.body.newData;

        UserService.update(id, newData, function (err, user) {
            return res.json(user);
        });
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
        remove: remove
    };
})();
