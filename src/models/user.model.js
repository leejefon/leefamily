const Sequelize = require('sequelize');

module.exports = function(app) {
  const sequelize = app.get('sequelize');
  const users = sequelize.define('users', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    avatar: {
      type: Sequelize.TEXT
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
      type: Sequelize.ENUM('M', 'F', 'O')
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
    parent: {
      type: Sequelize.INTEGER
    },
    spouse: {
      type: Sequelize.INTEGER
    },
    role: {
      type: Sequelize.ENUM('admin', 'regular')
    }
  }, {
    classMethods: {},
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return users;
};
