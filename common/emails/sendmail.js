
var loopback = require('loopback');
var fs = require('fs');
var _ = require('lodash');

module.exports = (type, params) => {
  var emailConfigs = {
    resetPassword: {
      subject: '[RedPocket] Reset Password',
      template: _.template(fs.readFileSync('common/emails/templates/reset_password.jst')),
      fromEmail: 'admin@redpocket.io'
    },
    confirmEmail: {
      subject: '[RedPocket] Confirm Email',
      template: _.template(fs.readFileSync('common/emails/templates/confirm_email.jst')),
      fromEmail: 'admin@redpocket.io'
    }
  };

  _.extend(params, {
    BASE_URL: process.env.BASE_URL
  });

  return loopback.Email.send({
    to: params.toEmail,
    from: emailConfigs[type].fromEmail,
    subject: emailConfigs[type].subject,
    html: emailConfigs[type].template(params)
  }).catch((e) => console.log(e));
};
