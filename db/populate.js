const secret = require('../config/secret');
const chalk = require('chalk');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');

// Data
const widgetData = require('../data/widgets.json');

// Populate function
async function checkDB() {

    const screenPromise = Screen.find();
    const widgetPromise = Widget.find();
    const userPromise = User.find();
    try {
      const [screens, widgets, users] = await Promise.all([
        screenPromise, widgetPromise, userPromise
      ]);
      if(screens.length === 0) {
        const screen = new Screen({
          name:'dashboard',
          widgets: [
            {name:'quick_info', x:0,y:400},
            {name:'all_screens', x:0,y:0}
          ]
        });
        screen.save()
        .then(r => { console.log(chalk.gray('+++ Populated Screens +++')) })
        .catch(e => {console.log(e)})
      }
      if(widgets.length === 0) {
        Widget.create(widgetData)
        .then(r => { console.log(chalk.gray('+++ Populated Widgets +++')) })
        .catch(e => {console.log(e)})
      }
      if(users.length === 0) {
        const user = new User({name:secret.botOwner, rank:10, points:999999999});
        user.save()
        .then(r => { console.log(chalk.gray('+++ Populated Users +++')) })
        .catch(e => {console.log(e)})
      }
    } catch (err) {
      console.log(err);
    }
}

checkDB();
