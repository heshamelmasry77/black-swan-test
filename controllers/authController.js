var User = require('../models/user');

module.exports = {

  register: function(req, res) {
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err, existingUser) {

      if (existingUser) {
        //409 means conflict
        return res.status(409).send({message: 'email is already registered'});
      } else {
        var user = new User(req.body);
        user.save(function(err, result) {
          if (err) {
            res.status(500).send({
              message: err.message,
            });
          }
          res.status(200);
        });
      }
    });
  },
  get: function(req, res) {
    if (req.params.id) {
      User.findById(req.params.id, function(err, result) {
        if (err) {
          console.log('there was a problem running the query');
          res.send(err);
        } else {
          res.send(result);
        }
      });
    } else {
      User.find({}, function(err, result) {
        // console.log(result);
        if (err) {
          console.log('there was a problem running the query');
          res.send(err);
        } else {
          res.send(result);
        }
      });
    }
  },
  delete: function(req, res) {
    if (req.params.id) {
      User.remove({_id: req.params.id}, function(err, result) {
        if (err) {
          console.log('there was a problem deleting the user the query');
          res.send(err);
        } else {
          res.send(result + " user is deleted");
        }
      });
    } else {
      console.log(err);
    }
  },
  update: function(req, res) {
    if (req.params.id) {
      User.update({_id: req.params.id},{
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      }, function(err, result) {
        if (err) {
          console.log('there was a problem updating the user');
          res.send(err);
        } else {
          res.send(result + " user details is updated");
        }
      });
    } else {
      console.log(err);
    }
  }
};


