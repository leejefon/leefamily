const path = require('path');

module.exports = (app) => {
  const routeRegex = /^(?!(\/api|\/js)).*$/;

  app.get(routeRegex, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../..', 'client/index.html'));
  });
};
