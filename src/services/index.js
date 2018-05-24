const Sequelize = require('sequelize');

const users = require('./users/users.service.js');

module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('mysql'), {
    dialect: 'mysql',
    logging: false, // console.log,
  });
  app.set('sequelize', sequelize);

  app.configure(users);

  // Setup relationships
  const models = sequelize.models;

  Object.keys(models).map(k => models[k])
    .filter(model => model.associate)
    .forEach(model => model.associate(models));

  sequelize.sync();
};
