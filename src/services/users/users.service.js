const Service = require('feathers-sequelize');
const model = require('../../models/user.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const Model = model(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('users', Service(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');
  service.hooks(hooks);
};
