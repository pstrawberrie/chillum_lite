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
          knex('users').insert({twitchUsername: user.username, points:5, lastUpdate: new Date()})
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
        if(rows.length === 1 && rows[0].twitchUsername === user.username) {

          knex('users').where('twitchUsername', '=', user.username)
          .update({points: rows[0].points + 1, lastUpdate: new Date()})
          .then(updated => {
            resolver(rows[0]);
          }).catch(err => {`err updating user points ${user.username}:\m${err}`})

        }
      }).catch(err => {`err getting user ${user.username}:\m${err}`})

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

  //+ Get user points
  getUserPoints(user) {
    return new Promise((resolve, reject) => {
      function resolver(result) { resolve(result) }

      knex('users').select('points').where('twitchUsername', '=', user)
      .then(points => {
        if(points.length === 0) return resolver(false);
        return resolver(points[0].points);
      }).catch(err => {console.log(err)})

    })
  },

  //+ Get all screens
  getAllScreens() {
    return new Promise((resolve, reject) => {
      function resolver(result) { return resolve(result); }

      knex('screens').select('*')
      .then(result => {
        return resolver(result);
      }).catch(err => {console.log(err)})

    })
  },

  //+ Get screen
  getScreen(name) {
    return new Promise((resolve, reject) => {
      function resolver(result) { resolve(result) }

      knex('screens').select('*').where('name', '=', name)
      .then(result => {
        console.log(result[0]);
        return resolver(result);
      }).catch(err => {console.log(err)})

    })
  },

  //+ Save New SCreen
  newScreen(json) {
    return new Promise((resolve, reject) => {
      function resolver(result) { return resolve(result) }

      console.log(json.name);
      knex('screens').insert({name:json.name, widgets:json.widgets})
      .then(saved => {
        return resolver(saved);
      }).catch(err => {console.log(err)})

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
