const secret = require('./config/secret');
const util = require('./lib/util');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const compression = require('compression');
const tmi = require('tmi.js');
const messageEntry = require('./lib/messageEntry');

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
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(compression());
}

// Routes
var routes = require('./routes/index');
app.use('/', routes);

//+ Socket Listener Events
io.on('connection', function(socket) {

  // Connect & Disconnect Notice
  console.log('Socket Client Connected');
  socket.on('disconnect', function(){
    console.log('Socket Client Disconnected');
  });

  //+ Test Socket
  socket.on('message', function(info){
    console.log(`message came in: ${info}`)
  });

});

//+ Twitch Bot Listener Events
//+ IRC Setup
const tmiOptions = {
  options: { debug:true},
  connection: {
    cluster:"aws",
    reconnect:true,
    timeout: 5000
  },
  identity: {
    username: secret.twitchUsername,
    password: secret.twitchKey
  },
  channels: secret.twitchChannels
};
const irc = new tmi.client(tmiOptions);

//+ IRC Connect
// irc.connect()
// .catch((error) => {
//   console.log('Error connecting to IRC:');
//   console.log(error);
// });

//+ IRC Connected Listener
irc.on('connected', function() {
  irc.whisper(secret.botOwner, 'irc bot just connected to ' + secret.twitchChannels);
  irc.say(secret.twitchMainChannel, 'PeteZaroll');
});

//+ IRC Disconnected Listener
irc.on('disconnected', function() {
  irc.whisper(secret.botOwner, 'irc bot just disconnected!');
});

//+ IRC Chat Listener (this is the juicy part)
irc.on("chat", function (channel, userstate, message, self) {

  // Make sure this is a "!" command, and that the bot didn't send it
  if (self) return;
  if(!util.validMessage(message)) return;

  messageEntry(userstate.username, message);
  io.emit('message', {user: userstate.username, message:message.replace('!','')});

});

// Start Server
const serverPort = 3069;
http.listen(serverPort, function(){
  console.log(chalk.cyan(`+++ chiLLum Lite is poppin off on http://localhost:${serverPort} +++`));
});

module.exports = io;
