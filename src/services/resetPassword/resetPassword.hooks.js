/**
 * resetPassword hooks
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

const { hashPassword } = require('@feathersjs/authentication-local').hooks;
const sendmail = require('../../hooks/sendmail');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [hashPassword()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendmail()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
