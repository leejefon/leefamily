/**
 * User Model
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

var bcrypt = require('bcrypt');

module.exports = (function () {

    var tableName = 'users';

    var attributes = {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        avatar: {
            type: Sequelize.TEXT('long')
        },
        password: {
            type: Sequelize.STRING
        },
        password_reset_key: {
            type: Sequelize.STRING
        },
        home_phone: {
            type: Sequelize.STRING
        },
        mobile_phone: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        birthday: {
            type: Sequelize.DATE
        },
        line: {
            type: Sequelize.STRING
        },
        facebook: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM('admin', 'regular'),
            defaultValue: 'regular'
        }
    };

    var associations = function () {
        // hasMany Transactions
        // hasMany Inventory
    };

    var options = {
        tableName: tableName,
        createdAt: 'created_at',
    	updatedAt: 'updated_at',
        // paranoid: true,
        // deletedAt: 'deleted_at',
        hooks: {
            beforeCreate: function (user, options, cb) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                            cb(err);
                        } else {
                            user.password = hash;
                            cb(null, user);
                        }
                    });
                });
            },
            beforeUpdate: function (user, options, cb) {
                if (user.password) {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(user.password, salt, function (err, hash) {
                            if (err) {
                                console.log(err);
                                cb(err);
                            } else {
                                user.password = hash;
                                cb(null, user);
                            }
                        });
                    });
                } else {
                    cb();
                }
            }
        }
        // freezeTableName: false,
        // classMethods: {},
        // instanceMethods: {},
    };

    return {
        attributes: attributes,
        associations: associations,
        options: options
    };
})();
