const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const screenSchema = new Schema ({

  name: {
    type: String,
    required: 'Screen needs a name',
    trim: true
  },
  screenWidth: {
    type: Number,
    default: 1920
  },
  screenHeight: {
    type: Number,
    default: 1080
  },
  widgets: Array

});

screenSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Screen', screenSchema);
