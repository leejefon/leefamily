const express = require('@feathersjs/express');
const hooks = require('./resetPassword.hooks');

class ResetPassword {
  setup(app) {
    this.app = app;
  }

  async get(password_reset_key) {
    const User = this.app.service('users');
    return User.find({
      query: { password_reset_key }
    }).then(data => data);
  }

  create() {

  }

  patch(password_reset_key) {

  }
}

module.exports = function (app) {
  app.use('api/resetPassword', new ResetPassword());
  app.use('/resetPassword', express.static(app.get('public')));
  app.use('/resetPassword/:token', express.static(app.get('public')));

  const service = app.service('api/resetPassword');
  service.hooks(hooks);
};
