const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compress = require('compression');
// const favicon = require('serve-favicon');
const logger = require('winston');

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
// const rest = require('@feathersjs/express/rest');
const socketio = require('@feathersjs/socketio');

const services = require('./services');
const appHooks = require('./app.hooks');
const authentication = require('./authentication');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express(feathers());

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));

app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use('/', express.static(app.get('public')));

// app.configure(rest());
app.configure(socketio());

app.configure(authentication);
app.configure(services);
// app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
