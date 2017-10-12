const knex = require('./connect');

module.exports = {

  //+ Get a User, or Auto-Create one if does not exist
  getUser(user) {
    return new Promise((resolve, reject) => {
      function resolver(result) { return resolve(result) }

      // Query for user
      knex.select('*').from('users').where('twitchUsername', '=', user.username)
      .then(rows => {

        // no user
        if(rows.length === 0) {
          //create new user
          knex('users').insert({twitchUsername: user.username})
          .then(result => {

            //query again and return the newly-created user
            console.log(`No user found by name ${user.username}. Created new user: ${user.username}`);
            knex.select('*').from('users').where('twitchUsername', '=', user.username)
            .then(newUser => {
              resolve(newUser[0]);
            }).catch(err => {`err getting newly-inserted user:\m${err}`})

          }).catch(err => {`err inserting new user:\m${err}`})
        }

        //user found, return user
        if(rows.length === 1 && rows[0].twitchUsername === user.id) {
          resolver(rows[0]);
        }
      }).catch(err => {`err getting user ${user.id}:\m${err}`})

    })
  },

  //+ Get chiLLum Lite Dashboard Data
  getDashbaordData() {
    return new Promise((resolve, reject) => {
      function resolver(result) { resolve(result) }
      const dashboardObj = {};

      knex('users').count('twitchUsername')
      .then(result => {
        dashboardObj.totalUsers = result[0]['count("twitchUsername")'];
        console.log(dashboardObj);
        resolver(dashboardObj);
      })
      .catch(err => {console.log(err)})

    })
  },

  //+ Testing
  test() {

    knex('users').insert({twitchUsername: 'testUsor'})
    .then(success => {

      knex.select('*').from('users')
      .then(rows => {
        console.log(`testing select * from users:\n${rows}`)
      }).catch(err => {console.log(`err testing select * from users:\n${err}`)})

    }).catch(err => {console.log(`err testing insert new user:\n${err}`)})

  }

}
