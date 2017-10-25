const mongoose = require('mongoose');
const User = mongoose.model('User');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');
const getDashboard = require('../db/lib/getDashboardDB');

/* GET dsahboard default */
exports.default = async (req, res) => {

  const dashboard = await getDashboard();
  res.render('dashboard', {
    title: 'Dashboard',
    dashboard
  })

}
