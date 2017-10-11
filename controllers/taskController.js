var Task = require('../models/task');

module.exports = {
  get: function(res) {
    Task.find({}).exec(function(err, result) {
      // console.log(result);
      if (!err) {
        res.send(result);
      } else {
        console.log('get tasks not available');
      }
    });
  },
  post: function(req, res) {
    console.log(req.body);
    // database.collection('tasks').insertOne(req.body);
    var task = new Task(req.body);
    task.save();

    res.status(200);
  },
};
