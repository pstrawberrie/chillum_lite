const secret = require('../config/secret');
const tmi = require('tmi.js');
const twitchEntry = require('./twitchEntry');

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

//+ IRC Connected Listener
irc.on('connected', function() {
  irc.whisper(secret.botOwner, 'irc bot just connected to ' + secret.twitchChannels);
  irc.say(secret.twitchMainChannel, 'we here PeteZaroll');
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

  twitchEntry(userstate.username, message);

});

module.exports = {

  startListener() {
    irc.connect()
    .catch((error) => {
      console.log('Error connecting to IRC:');
      console.log(error);
    });
  },

  sendMessage(type, message, user) {
    if(type === 'say') { irc.say(secret.twitchMainChannel, message) }
    if(type === 'whisper') { irc.whisper(user, message) }
    if(type === 'action') { irc.action(secret.twitchMainChannel, message) }
  }

}
