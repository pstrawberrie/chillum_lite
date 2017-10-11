const twitchListener = require('../twitchListener');
//@TODO: test socket job from a twitch message

module.exports = (user, arg1, arg2, arg3) => {

  let testString = `${user} did a test!`;
  if(arg1) {testString += ('arg1:' + arg1)}
  if(arg2) {testString += ('arg1: ' + arg1 + ' arg2: ' + arg2)}
  if(arg3) {testString += ('arg1: ' + arg1 + ' arg2: ' + arg2 + ' arg3: ' + arg3)}
  return twitchListener.sendMessage('say', testString);

}
