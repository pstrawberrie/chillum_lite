const chalk = require('chalk');
const fs = require('fs');
const twitchCommandsDir = './core/twitch';
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
  if(!Object.keys(commandsObj).includes(command)) return;
  let arg1 = messageArr[1] || null,
      arg2 = messageArr[2] || null,
      arg3 = messageArr[3] || null;

  commandsObj[command](user, arg1, arg2, arg3)

}
