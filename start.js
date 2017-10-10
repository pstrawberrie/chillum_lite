const secret = require('./config/secret');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Database
require('./db');

// Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());

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
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(compression());
}

// Routes
var routes = require('./routes/index');
app.use('/', routes);

// Set up Socket Listener Events
io.on('connection', function(socket){

  //+ Connect & Disconnect Notice
  console.log('New Client Connected');
  socket.on('disconnect', function(){
    console.log('Client Disconnected');
  });

  //+ Test Socket
  socket.on('test', function(info){
    console.log(`test socket caem in: ${info}`)
  });

});

// Start Server
http.listen(3069, function(){
  console.log(chalk.cyan('+++ web listening (http://localhost:3069) +++'));
});

module.exports = app;
