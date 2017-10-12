// !squid - send some squids, m8

module.exports = (user, arg1) => {

  const twitchListener = require('../twitchListener');

  if(!arg1) {
    return twitchListener.sendMessage('say', `Squid1 Squid2 Squid3 Squid4`);
  }
  if(arg1 === 'wave') {
    return twitchListener.sendMessage('say', `Squid4`);
  }
  if(arg1 === 'ultra') {
    return twitchListener.sendMessage(
      'say',
      `Squid1 Squid1 Squid2 Squid3 Squid3 Squid3 Squid4 Squid4`
    );
  }


}
