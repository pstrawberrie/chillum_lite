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
  widgets: Array

});

screenSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Screen', screenSchema);
