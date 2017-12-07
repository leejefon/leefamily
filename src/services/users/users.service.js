// Initializes the `users` service on path `/users`
const Service = require('feathers-sequelize');
const Model = require('../../models/user.model');
const hooks = require('./users.hooks');
const filters = require('./users.filters');

module.exports = function () {
  const app = this;
  const model = Model(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model: model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', Service(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
