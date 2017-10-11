var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// var database;

var Task = mongoose.model('Task', {
  name: String,
  description: String,
  date_time: {type: Date, default: Date.now}
});

app.use(bodyParser.json());

app.get('/api/task', GetTasks);

app.post('/api/task', function(req, res) {
  console.log(req.body);
  // database.collection('tasks').insertOne(req.body);
  var task = new Task(req.body);
  task.save();

  res.status(200);
});

function GetTasks(res) {
  Task.find({}).exec(function(err, result) {
    // console.log(result);
    if (!err) {
      res.send(result);
    } else {
      console.log('get tasks not available');
    }
  });
}

mongoose.connect('mongodb://localhost:27017/blackswan', function(err) {
  if (!err) {
    console.log('we are connected to mongo');
    // database = db;
    // GetTasks();
  }
});

var server = app.listen(5000, function() {
  console.log('listening on port', server.address().port);
});
