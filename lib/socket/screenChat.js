// Pass through twitch chat message to front end

module.exports = (json) => {

  const socketListener = require('../socketListener');
  socketListener.send('screenChat', json);

}
