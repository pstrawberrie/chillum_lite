const db = require('../db/util');

exports.default = (req, res) => {

  db.getDashbaordData()
  .then(result => {
    res.render('dashboard', { chillum: result, title: 'Dashboard' })
  })

}
