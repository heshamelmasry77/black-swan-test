var Task = require('../models/task');

module.exports = {
  get: function(req, res) {


    if (req.params.id) {
      Task.findById(req.params.id, function(err, result) {
        // console.log(result);
        if (!err) {
          res.send(result);
        } else {
          console.log('get task by id not available');
          res.send(err);
        }
      });
    } else {
      Task.find({}).populate('user').exec(function(err, result) {
        // console.log(result);
        if (!err) {
          res.send(result);
        } else {
          console.log('get tasks not available');
          res.send(err);
        }
      });
    }
  },
  post: function(req, res) {
    console.log(req.body.user);
    // database.collection('tasks').insertOne(req.body);
    var task = new Task(req.body);
    task.save();

    res.status(200);
  }
};
