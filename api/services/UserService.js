/**
 * User Service
 *
 * @author   :: Jeff Lee
 * @created  :: 2016/01/08
 */

var algoliasearch = require('algoliasearch');
var client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_API_KEY);

module.exports = (function () {

    var index = client.initIndex('leefamily');

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
        cb(null, newData);
    }

    function _addToAlgolia (user, cb) {
        var objectID = 'leefamily-' + user.id;

        delete user.id;
        delete user.password;
        delete user.password_reset_key;
        delete user.role;
        delete user.updated_at;
        delete user.created_at;

        index.addObject(user, objectID, cb);
    }

    function _updateToAlgolia () {

    }

    return {
        list: list,
        getByName: getByName,
        add: add,
        update: update
    };
})();
