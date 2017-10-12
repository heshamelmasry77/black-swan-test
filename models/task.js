var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  name: String,
  description: String,
  date_time: {type: Date, default: Date.now}
});
