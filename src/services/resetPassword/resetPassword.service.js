/**
 * resetPassword service
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

const express = require('@feathersjs/express');
const hooks = require('./resetPassword.hooks');

const generateToken = () => Array.from(new Array(5))
  .map(() => Math.random().toString(36).slice(2)) // 5 chars times 5
  .join('');

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

  async create(data) {
    const User = this.app.service('users');
    const newToken = generateToken();
    const { email } = data;

    // For the sendmail hook
    data.token = newToken;

    return User.patch(null, {
      password_reset_key: newToken
    }, {
      query: { email }
    });
  }

  async patch(query, data) {
    const User = this.app.service('users');
    const { password_reset_key } = query;
    const { password } = data;

    return User.patch(null, {
      password_reset_key: null,
      password
    }, {
      query: { password_reset_key }
    });
  }
}

module.exports = function (app) {
  app.use('api/resetPassword', new ResetPassword());
  app.use('/resetPassword', express.static(app.get('public')));
  app.use('/resetPassword/:token', express.static(app.get('public')));

  const service = app.service('api/resetPassword');
  service.hooks(hooks);
};
