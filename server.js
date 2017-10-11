var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

var database;

app.use(bodyParser.json());

app.post('/api/task', function(req, res) {
  console.log(req.body);
  database.collection('tasks').insertOne(req.body);

  res.status(200);
});

mongo.connect('mongodb://localhost:27017/blackswan', function(err, db) {
  if (!err) {
    console.log('we are connected to mongo');
    database = db;
  }
});

var server = app.listen(5000, function() {
  console.log('listening on port', server.address().port);
});
