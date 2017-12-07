const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compress = require('compression');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const authentication = require('./authentication');
const services = require('./services');
const middleware = require('./middleware');
const appHooks = require('./app.hooks');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use('/', feathers.static(app.get('public')));
app.use('/login', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());

app.configure(authentication);
app.configure(services);
app.configure(middleware); // always has to be last
app.hooks(appHooks);

module.exports = app;
