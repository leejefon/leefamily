const Sequelize = require('sequelize');

module.exports = function(app) {
  const sequelize = app.get('sequelize');
  const users = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    },
    // two_factor_login: {},
    lastname: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    c_lastname: {
      type: Sequelize.STRING
    },
    c_firstname: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.ENUM('M', 'F', 'O')
    },
    phone_cell: {
      type: Sequelize.STRING
    },
    phone_home: {
      type: Sequelize.STRING
    },
    street1: {
      type: Sequelize.STRING
    },
    street2: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zip_code: {
      type: Sequelize.STRING
    },

    emerg_name: {
      type: Sequelize.STRING
    },
    emerg_phone: {
      type: Sequelize.STRING
    },
    emerg_relation: {
      type: Sequelize.STRING
    },
    referrer: { // User Id
      type: Sequelize.INTEGER
    },
    referral_source: {
      type: Sequelize.ENUM('CAMPUS', 'EMAIL', 'NEWSPAPER', 'TV', 'FRIEND', 'VOLUNTEER', 'CURRENT_STUDENT', 'FLYER', 'OTHER')
    },

    type: { // JSON string, { isMember: true, isVolunteer: false, ... }
      type: Sequelize.TEXT
    },
    // type_member: {},
    // type_volunteer: {},
    // type_apprentice: {},
    // type_training: {},
    // type_tzucheng: {},
    // type_commitee: {},
    // type_genpub: {},
    // type_65plus: {},

    role: {
      type: Sequelize.STRING
    }
    // is_instructor: {},
    // is_assistant: {}
  }, {
    classMethods: {}
  });

  return users;
};
