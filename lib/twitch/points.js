//!points - check user's current points

module.exports = (user, arg1) => {

  const currentUser = arg1 ? arg1 : user;

  const db = require('../../db/util');
  const twitchListener = require('../twitchListener');

  db.getUserPoints(currentUser)
  .then(points => {
    if(points == false) {
      return twitchListener.sendMessage('say', `${currentUser} is not in the system m8 BibleThump`);
    } else {
      return twitchListener.sendMessage('say', `${currentUser} has ${points} points`);
    }
  }).catch(err => {console.log(err)})

}
