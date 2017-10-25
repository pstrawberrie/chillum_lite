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

exports.newscreen = (req, res) => {

  res.json({newscreen:'make it work'});

}
