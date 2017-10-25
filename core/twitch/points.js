//!points - check user's current points

module.exports = (user, arg1) => {

  const currentUser = arg1 ? arg1 : user;

  const getUser = require('../../db/lib/getUserDB');
  const twitchListener = require('../twitchListener');

  getUser(currentUser)
  .then(user => {
    return twitchListener.sendMessage('say', `${currentUser} has ${user.points} points`);
  }).catch(err => {console.log(err)})

}
