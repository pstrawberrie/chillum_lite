const secret = require('./config/secret');
const util = require('./core/util');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const compression = require('compression');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const errorHandlers = require('./handlers/errorHandlers');

// Database
require('./db/connect');

// Models
require('./models/User');
require('./models/Screen');
require('./models/Widget');

// Populate New DB if none exists
require('./db/populate');

// Twitch Listener
const bot = require('./core/twitchListener');
bot.startListener();

// Socket Listener
const socket = require('./core/socketListener');
socket.startListener(io);

// Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

// Webpack
if (app.get('env') === 'development') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackDevConfig = require('./config/webpack.dev.config');
  var compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      stats: {colors: true}
  }));
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(compression());
}

// Session
app.use(session({
  secret: secret.sessionSecret,
  key: secret.sessionKey,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Default Middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  next();
});

// Routes
var routes = require('./routes/index');
app.use('/', routes);

// 404 Errors
app.use(errorHandlers.notFound);

// Serious Errors
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);

// Start Server
const serverPort = 3069;
http.listen(serverPort, function(){
  console.log(chalk.cyan(`+++ chiLLum Lite is served - http://localhost:${serverPort} +++`));
});
