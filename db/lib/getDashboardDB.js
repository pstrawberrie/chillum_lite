const mongoose = require('mongoose');
const User = mongoose.model('User');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');

module.exports = () => {
  return new Promise((resolve, reject) => {
    function resolver(result) {resolve(result)}
    function rejector(error) {reject(error)}

    const dashboard = {}
    User.find().count()
    .then(userCount => {
      dashboard.totalUsers = userCount;

      Screen.find()
      .then(screens => {
        dashboard.screens = screens;
        dashboard.totalScreens = screens.length;

        Widget.find()
        .then(widgets => {
          dashboard.widgets = widgets;
          dashboard.totalWidgets = widgets.length;
          resolver(dashboard);
        })

      })

    }).catch(err => {console.log(err)})

  })
}
