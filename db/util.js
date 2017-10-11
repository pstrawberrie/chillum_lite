const knex = require('./connect');

module.exports = {

  getUser(user) {
    return new Promise((resolve, reject) => {
      function resolver(result) { resolve(result) }

      // Query for user
      knex.select('*').from('users').where('twitchUserID', '=', user.id)
      .then(rows => {

        // no user
        if(rows.length === 0) {
          //create new user
          knex('users').insert({twitchUserID: id, twitchUsername: user.name})
          .then(result => {

            //query again and return the newly-created user
            console.log(`No user found by id ${user.id}. Created new user: ${user.name}/${user.id}`);
            knex.select('*').from('users').where('twitchUserID', '=', user.id)
            .then(newUser => {
              return resolve(newUser[0]);
            }).catch(err => {`err getting newly-inserted user:\m${err}`})

          }).catch(err => {`err inserting new user:\m${err}`})
        }

        //user found, return user
        if(rows.length === 1 && rows[0].twitchUserID === user.id) {
          return resolver(rows[0]);
        }
      }).catch(err => {`err getting user ${user.id}:\m${err}`})

    })
  },

  test() {

    knex('users').insert({twitchUserID: 'asdf123', twitchUsername: 'testUsor'})
    .then(success => {

      knex.select('*').from('users')
      .then(rows => {
        console.log(`testing select * from users:\n${rows}`)
      }).catch(err => {console.log(`err testing select * from users:\n${err}`)})

    }).catch(err => {console.log(`err testing insert new user:\n${err}`)})


  }

}
