const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (username) => {
  return new Promise((resolve, reject) => {
    function resolver(result) {resolve(result)}
    function rejector(error) {reject(error)}

    User.findOne({name:username})
    .then(user => {
      if(user == null) {
        const newUser = new User({name: username});
        newUser.save()
        .then(saveResult => {
          console.log(`creepin on ${username}`);
          return resolver(saveResult);
        }).catch(err => {rejector(err)});
      }
      return resolver(user);

    }).catch(err => {rejector(err)})

  })
}
