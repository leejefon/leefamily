/**
 * User Service
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

var bcrypt = require('bcrypt');
var algoliasearch = require('algoliasearch');
var client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_API_KEY);

module.exports = (function () {

    var index = client.initIndex('leefamily' + (process.env.NODE_ENV === 'development' ? '-dev' : ''));

    function list (cb) {
        User.findAll({
            attributes: {
                exclude: ['password', 'password_reset_key', 'created_at', 'updated_at'],
                include: [[sequelize.fn('date_format', sequelize.col('birthday'), '%Y/%m/%d'), 'birthday']]
            }
        }).then(function (users) {
            cb(null, users);
        });
    }

    function getByName (name, cb) {
        User.findOne({
            attributes: {
                exclude: ['password', 'password_reset_key', 'created_at', 'updated_at'],
                include: [[sequelize.fn('date_format', sequelize.col('birthday'), '%Y/%m/%d'), 'birthday']]
            },
            where: {
                name: name
            }
        }).then(function (user) {
            cb(null, user);
        });
    }

    function add (newUser, cb) {
        User.create(newUser).then(function (user) {
            _addToAlgolia(user.get({ plain: true }), function (err, content) {
                cb(null, user);
            });
        });
    }

    function update (id, newData, cb) {
        // HACK: for some reason beforeUpdate hook doesn't seem to work
        if (newData.password) {
            newData.password = bcrypt.hashSync(newData.password, bcrypt.genSaltSync(10));
        }

        User.update(_.omit(newData, 'id'), {
            where: {
                id: id
            }
        }).then(function (result) {
            if (newData.avatar) {
                cb(null, result);
            } else {
                _updateToAlgolia(newData, function (err, content) {
                    cb(null, result);
                });
            }
        });
    }

    function _addToAlgolia (user, cb) {
        var objectID = 'leefamily-' + user.id;

        index.addObject(_.omit(user, [
            'id', 'password', 'password_reset_key', 'avatar', 'role', 'created_at', 'updated_at'
        ]), objectID, cb);
    }

    function _updateToAlgolia (user, cb) {
        user.objectID = 'leefamily-' + user.id;

        index.saveObject(_.omit(user, [
            'id', 'password', 'password_reset_key', 'role', 'created_at', 'updated_at'
        ]),  cb);
    }

    return {
        list: list,
        getByName: getByName,
        add: add,
        update: update
    };
})();
