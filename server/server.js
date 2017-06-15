const loopback = require('loopback');
const boot = require('loopback-boot');
const fs = require('fs');

if (fs.existsSync('./.env')) {
  require('dotenv').load();
}

if (!process.env.RUNNING_TASK && !process.env.RUNNING_MIGRATION) {
  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const config = require('../webpack.config');

    new WebpackDevServer(webpack(config), {
      contentBase: config.contentBase,
      publicPath: config.output.publicPath,
      hot: true,
      inline: false,
      historyApiFallback: true,
      quiet: true
    }).listen(3001, 'localhost', (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Listening at localhost:3001');
    });
  }

  const app = module.exports = loopback();

  app.start = () => {
    return app.listen(() => {
      app.emit('started');
      const baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (app.get('loopback-component-explorer')) {
        const explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
  };

  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, (err) => {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module) {
      app.start();
    }
  });
}
