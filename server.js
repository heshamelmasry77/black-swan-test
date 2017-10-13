var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// var database;

var authController = require('./controllers/authController');
var taskController = require('./controllers/taskController');

//Middleware
app.use(bodyParser.json());

//Requests
app.get('/api/task/:id?', taskController.get);
app.get('/api/users/:user_id/tasks', taskController.get);
app.delete('/api/task/:id', taskController.delete);
app.post('/api/task', taskController.post);

app.get('/api/users/:id?', authController.get);
app.delete('/api/users/:id', authController.delete);
app.post('/api/users/:id', authController.update);
app.post('/api/users', authController.register);

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
