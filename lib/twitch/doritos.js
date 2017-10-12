// !doritos - send some squids, m8

module.exports = (user, arg1) => {

  const twitchListener = require('../twitchListener');

  if(!arg1) {
    return twitchListener.sendMessage('say', `NO`);
  }
  if(arg1 === 'please') {
    return twitchListener.sendMessage(
      'say', `<3 DoritosChip DoritosChip DoritosChip DoritosChip DoritosChip DoritosChip <3`
    );
  }


}
