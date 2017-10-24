const chalk = require('chalk');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');

//@TODO: Populate a new database on first start
//0. Check for db
//1. Populate db stats
//2. Populate default widgets
//3. Populate test screen

//do some async await and promisify!
const screens = Screen.find({});
const widgets = Widget.find({});



console.log(chalk.cyan(`+++ set up mongodb populate +++`));
