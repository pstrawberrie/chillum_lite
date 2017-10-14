const db = require('../db/util');

exports.getScreen = (req, res, next) => {

  const screenName = req.params.name;
  db.getScreen(screenName)
  .then(screen => {
    res.locals.screen = screen;
    return next();
  }).catch(err => { console.log(err); res.status(500).send(err) })

}

exports.default = (req, res) => {

  const screen = res.locals.screen;
  res.render('screen', { title: screen.name, screen})

}
