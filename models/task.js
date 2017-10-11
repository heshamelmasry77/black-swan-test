var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
  name: String,
  description: String,
  date_time: {type: Date, default: Date.now}
});
