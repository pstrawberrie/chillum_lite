const chalk = require('chalk');
const fs = require('fs');
const socketDir = './core/socket';
const socketJobs = [];
fs.readdirSync(socketDir).forEach(file => {
  socketJobs.push(file.replace('.js', ''));
});
const socketObj = {};
socketJobs.forEach(job => {
  socketObj[job] = require(`./socket/${job}`);
});
console.log(chalk.cyan(`Registered Socket Jobs: ${socketJobs.join(', ')}`));

// Run the socket job
module.exports = (eventName, json) => {
  socketObj[eventName](json);
}
