var Task = require('../models/task');

module.exports = {

  get: function(req, res) {

    if (req.params.id) {
      Task.findById(req.params.id, function(err, result) {
        if (!err) {
          res.send(result);
        } else {
          console.log('get task by id not available');
          res.send(err);
        }
      });
    } else if (req.params.user_id) {
      Task.find({user: req.params.user_id}, function(err, result) {
        // console.log(result);
        if (!err) {
          res.send(result);
        } else {
          console.log('get all tasks for a user not available');
          res.send(err);
        }
      });
    } else if (req.params.user_id && req.params.task_id) {
      Task.find({
        user: req.params.user_id,
        _id: req.params.task_id
      }, function(err, result) {
        if (!err) {
          res.send(result);
        } else {
          console.log('get tasks info for a user not available');
          res.send(err);
        }
      });
    } else {
      Task.find({}).populate('user').exec(function(err, result) {
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
    if (req.params.user_id) {
      var task = new Task({
            user: req.params.user_id,
            name: req.body.name,
            description: req.body.description
          }
      );
      task.save(function(err){ // will this callback always be called correctly?
        console.log('yes');

        if(err) {
          res.send('ERROR!');
        }
        else {
          res.send('SUCCESS!');
          res.status(200);
        }
      });
    }
  },
  update: function(req, res) {
    if (req.params.task_id) {
      Task.update({
        _id: req.params.task_id,
        user: req.params.user_id
      }, {
        name: req.body.name,
        description: req.body.description
      }, function(err, result) {
        if (err) {
          console.log('there was a problem updating a task');
          res.send(err);
        } else {
          res.send(result + ' task details is updated');
        }
      });
    } else {
      console.log(err);
    }
  },
  delete: function(req, res) {
    if (req.params.user_id && req.params.task_id) {
      Task.remove({
        _id: req.params.task_id,
        user: req.params.user_id
      }, function(err, result) {
        if (err) {
          console.log('there was a problem deleting the task for a user query');
          res.send(err);
        } else {
          res.send(result + ' task for user is deleted');
        }
      });
    } else {
      console.log(err);
    }
  }
};
