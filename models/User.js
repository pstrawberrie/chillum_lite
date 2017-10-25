const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema ({

  name: {
    type: String,
    required: 'User needs a name',
    trim: true
  },
  points: {
    type: Number,
    default:1
  },
  rank:  {
    type: Number,
    default:0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

userSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('User', userSchema);
