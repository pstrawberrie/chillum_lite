const db = require('../db/util');

exports.getAllScreens = (req, res, next) => {
  db.getAllScreens()
  .then(screens => {
    res.locals.screens = screens;
    return next();
  }).catch(err => {console.log(err)})
}

//POST to create new screen
exports.newScreen = (req, res) => {
  const newScreenJson = {
    name: req.body.screenName,
    widgets: { idk:'m8' }
  };
  db.newScreen(newScreenJson)
  .then(newscreen => {
    console.log(`NEW SCREEN ALL UP IN! ${newScreenJson.name}`);
    res.redirect('/');
  }).catch(err => {console.log(err);res.status(500).send(err);})

}

exports.default = (req, res) => {

  db.getDashbaordData()
  .then(result => {
    res.render('dashboard', { chillum: result, title: 'Dashboard' })
  }).catch(err => {console.log(err)})

}
