const secret = require('../config/secret');
const chalk = require('chalk');
const mongoose = require('mongoose');

mongoose.connect(secret.dbString, {useMongoClient: true});
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', function () {
  console.log(chalk.magenta('+++ connected to mongodb +++'));
});
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});
