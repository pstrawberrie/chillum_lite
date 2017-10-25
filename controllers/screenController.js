const mongoose = require('mongoose');
const User = mongoose.model('User');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');
const getScreen = require('../db/lib/getScreenDB');

exports.default = async (req, res) => {

  const screen = await getScreen(req.params.name);
  if(screen == null || screen == undefined) return res.redirect('/');
  res.render('screen', {
    title: screen.name,
    screen
  });

}

exports.newScreen = async (req, res) => {

  if(!req.body) return res.redirect('/');
  const checkName = await Screen.findOne({name:req.body.screenName});
  if(checkName != null) {
    req.flash('error', `${req.body.screenName} already exists`);
    return res.redirect('/');
  }

  // Check for widgets
  const bodyKeys = Object.keys(req.body);
  let widgetArr = [];
  await bodyKeys.forEach((key) => {
    if(key.includes('widget_')) {
      let widgetKey = key.replace('widget_', '');
      widgetArr.push(widgetKey);
    }
  });

  // New Screen obj
  const screenObj = { name: req.body.screenName }
  if(widgetArr.length > 0) screenObj.widgets = widgetArr;
  const newScreen = new Screen(screenObj);

  await newScreen.save();
  res.redirect(`/screen/${req.body.screenName}`);

}
