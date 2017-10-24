const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');
const Screen = mongoose.model('Screen');
const Widget = mongoose.model('Widget');

/* GET screen default */
exports.default = (req, res) => {

  db.getDashbaordData()
  .then(dashTotals => {

    db.getWidgets()
    .then(widgets => {

      res.render('dashboard', {
        chillum: dashTotals,
        widgets,
        title: 'Dashboard'
      });

    }).catch(err => {console.log(err)})


  }).catch(err => {console.log(err)})

}

/* POST new screen */
exports.newScreen = (req, res) => {
  const newScreenJson = {
    name: req.body.screenName,
    widgets: { idk:'m8' }
  };
  db.newScreen(newScreenJson)
  .then(newscreen => {
    console.log(`New screen created: ${newScreenJson.name}`);
    res.redirect('/');
  }).catch(err => {console.log(err);res.status(500).send(err);})
}
