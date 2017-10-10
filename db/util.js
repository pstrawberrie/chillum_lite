const knex = require('./index');

//@TODO: Adapt this to suit our needs - keep userID and add in username as well
exports.util = {

  getUser(id) {
    return new Promise((resolve, reject) => {
      function resolver(result) { resolve(result) }

      // Query for user
      knex.select('*').from('users').where('userID', '=', id)
      .then(rows => {

        // no user
        if(rows.length === 0) {
          //create new user
          knex('users').insert({userID: id, numCommandsIssued: 1})
          .then(result => {

            //query again and return the newly-created user
            console.log(`No user found by id ${id}. Created new user: ${id}`);
            knex.select('*').from('users').where('userID', '=', id)
            .then(newUser => {
              return resolve(newUser[0]);
            }).catch(err => {`err getting newly-inserted user:\m${err}`})

          }).catch(err => {`err inserting new user:\m${err}`})
        }

        //user found, return user
        if(rows.length === 1 && rows[0].userID === id) {
          return resolver(rows[0]);

          //@TODO: update user's numCommandsIssued +1
          //does an update return the row that was updated??
          // knex('users').where('userID', '=', id).update({numCommandsIssued: rows[0].numCommandsIssued + 1})
          // .then(finishedUser => {
          // })

        }
      }).catch(err => {`err getting user ${id}:\m${err}`})

    })
  }

}
