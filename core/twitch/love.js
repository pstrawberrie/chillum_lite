// !love - send some LOOVE <333

module.exports = (user, arg1, arg2) => {

  const twitchListener = require('../twitchListener');

  if(arg1 == null) {
    return twitchListener.sendMessage('action', `loves ${user} <3`);
  }
  if(arg1 != null && arg2 != null) {
    return twitchListener.sendMessage('say', `<3 ${arg1} is in LOOOVE with ${arg2} <3`);
  }
  if(arg1 != null && arg2 == null) {
    return twitchListener.sendMessage('say', `${user} loves ${arg1} <3`);
  }

}
