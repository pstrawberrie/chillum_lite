const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');

exports.default = (req, res) => {

  //1. grab screen from mongodb
  //2. render screen

  res.json({screen:'fosho'})
  //res.render('screen', { title: screen.name, screen})

}
