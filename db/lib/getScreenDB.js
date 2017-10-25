const mongoose = require('mongoose');
const Screen = mongoose.model('Screen');

module.exports = (name) => {
  return new Promise((resolve, reject) => {
    function resolver(result) {resolve(result)}
    function rejector(error) {reject(error)}

    Screen.findOne({name})
    .then(screen => {
      return resolver(screen);
    }).catch(err => {rejector(err)})

  })
}
