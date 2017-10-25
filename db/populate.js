const chalk = require('chalk');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');

async function checkDB() {

    const screenPromise = Screen.find();
    const widgetPromise = Widget.find();
    const userPromise = User.find();
    try {
      const [screens, widgets, users] = await Promise.all([
        screenPromise, widgetPromise, userPromise
      ]);
      if(screens.length === 0) {
        const screen = new Screen({name:'Test Screen'});
        screen.save()
        .then(r => { console.log(chalk.gray('+++ Populated Screens +++')) })
        .catch(e => {console.log(e)})
      }
      if(widgets.length === 0) {
        const widget = new Widget({name:'Test Widget'});
        widget.save()
        .then(r => { console.log(chalk.gray('+++ Populated Widgets +++')) })
        .catch(e => {console.log(e)})
      }
      if(users.length === 0) {
        const user = new User({name:'testUser'});
        user.save()
        .then(r => { console.log(chalk.gray('+++ Populated Users +++')) })
        .catch(e => {console.log(e)})
      }
    } catch (err) {
      console.log(err);
    }
}

checkDB();
