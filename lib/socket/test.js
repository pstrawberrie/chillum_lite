//@TODO: test twitch message from a socket job

module.exports = (json) => {

  const db = require('../../db/util');
  const socketListener = require('../socketListener');
  const twitchListener = require ('../twitchListener');

  console.log(`Running socket job "test":\n${json}`);

  db.test();
  socketListener.send('test', json);
  twitchListener.sendMessage('say', 'Socket test job sent');

}
