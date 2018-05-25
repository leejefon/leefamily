'use strict';

const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const gravatar = require('../../hooks/gravatar');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword(), gravatar()],
    update: [authenticate('jwt'), hashPassword()],
    patch: [authenticate('jwt'), hashPassword()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [],
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