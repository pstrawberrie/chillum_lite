const chalk = require('chalk');
const fs = require('fs');
const twitchCommandsDir = './lib/twitch';
const twitchCommands = [];
fs.readdirSync(twitchCommandsDir).forEach(file => {
  twitchCommands.push(file.replace('.js', ''));
});
const commandsObj = {};
twitchCommands.forEach(command => {
  commandsObj[command] = require(`./twitch/${command}`);
});
console.log(chalk.cyan(`Registered Twitch Commands: ${twitchCommands.join(', ')}`));

module.exports = (user, message) => {

  console.log(`${user} sent message ${message}`);

  const messageArr = message.split(' ');
  const command = messageArr[0].replace('!','');
  let arg1 = null, arg2 = null, arg3 = null;
  if(messageArr.length === 2) {arg1 = messageArr[1]}
  if(messageArr.length === 3) {arg2 = messageArr[2]}
  if(messageArr.length === 4) {arg3 = messageArr[3]}

  commandsObj[command](user, arg1, arg2, arg3)

}
