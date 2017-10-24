const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const widgetSchema = new Schema ({

  name: {
    type: String,
    required: 'Widget needs a name',
    trim: true
  },
  description: {
    type: String,
    default: 'This widget has no description'
  }

});

widgetSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Widget', widgetSchema);
