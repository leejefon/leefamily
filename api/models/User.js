/**
 * User Model
 *
 * @author      :: Jeff Lee
 * @created     :: 2016/01/08
 */

module.exports = (function () {

    var tableName = 'users';

    var attributes = {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
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
            type: Sequelize.BOOLEAN
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
        familyOf: {
            type: Sequelize.INTEGER
        },
        role: {
            type: Sequelize.ENUM('admin', 'regular')
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
            beforeCreate: function (user, cb) {
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
            beforeUpdate: function (user, cb) {
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
