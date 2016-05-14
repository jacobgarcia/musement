'use strict';

const express = require('express'),
multer = require('multer'),
User = require("models/user.js"),
Moment = require("models/moment.js"),
jwt = require('jsonwebtoken'),
//flash = require('connect-flash'),
//LocalStrategy = require('passport-local').Strategy,
router = express.Router();

//Register new user
router.route('/users/:user_id')
.post(function (req, res) {
  console.log('Creating user...');
  res.json({'message':'not supported yet.'});
});

//AUTHENTICATE TO GIVE NEW TOKEN
router.post('/authenticate', function(req, res) {
  //console.log("LOGIN INFO:" + req.body);
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. Wrong user or password.' });
    } else if (user) {
      if (user.password != req.body.password) { // check if password matches
        console.log(user.password);
        console.log('Wrong password');
        res.json({ success: false, message: 'Authentication failed. Wrong user or password.' });
      } else {
        // if user is found and password is right
        // create a token and --- sign with the user information --- and secret password
        var token = jwt.sign({"name": user.name, "email": user.email}, "config.secret", {
          expiresIn: 216000 // expires in 6 hours
        });
        //console.dir(token)
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Logged in',
          token: token
        });
      }

    }

  });
});

//MIDDLEWARE TOKEN-ACCESS
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var token = req.body.token || req.query.token || req.headers['x-access-token']; // check header or url parameters or post parameters for token
//
//   if (token) {
//     var decodedToken = jwt.decode(token);
//
//     jwt.verify(token, config.secret, function(err, decoded) { // decode token
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         //Send the decoded token to the request body
//         req.decoded = decoded; // if everything is good, save to request for use in other routes
//         res.decode = decoded;
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//   }
// });

// *************************************
// ***                               ***
// ***             USER              ***
// ***                               ***
// *************************************

router.route('/users')
  .post(function (req, res) {
    var user = new User();
    //console.log(req);
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.bornDate = req.body.bornDate;
    user.username = req.body.username;
    user.image = req.body.image;
    user.save(function (err) {
      if (err){
        res.send(err);
      } else {
        res.json({message: 'Successfully created' + user.name});
      }
    });
  });

router.route('/users/:user_id')
  .get(function (req, res) {
    User.findById(req.params.user_id,
      'username email name lastName image following follow bornDate',
      function(err, user) {
        if (err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });
  })
  .put(function (req, res) {
    //UPDATE USER PROFILE
    res.json({'message':'not supported yet.'});
  })
  .delete(function (req, res) {
    //DELETE USER
      //Authenticate logged user is deleting himself
    res.json({'message':'not supported yet.'});
  });

// *************************************
// ***                               ***
// ***            MOMENTS            ***
// ***                               ***
// *************************************

router.route('/users/:user_id/moments')
  .get(function (req, res) {
    //Get moments of user
      //Validate user is accessing it's own moments or of people he follows
    User.findById(req.params.user_id, 'moments')
    .populate('moments')
    .exec(
      function(err, user) {
        if (err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });
  })
  .post(function (req, res) {
    //Add new moment to user, can add within project
    res.json({'message':'not supported yet.'});
  });

router.route('/moments/:moment_id')
  .get(function (req, res) {
    //Get detailed information of the moment
      //Validate the user adds a moment for him (and not someone else)
    Moment.findById(req.params.moment_id)
    .exec(
      function(err, moment) {
        if (err) {
          res.send(err);
        } else if (!moment) {
          res.json({"message": "No moment found.", "success": false});
        } else {
          res.json(moment);
        }
      });
  })
  .put(function (req, res) {
    //Update moment of the user
    res.json({'message':'not supported yet.'});
  })
  .delete(function (req, res) {
    //Remove moment from user
      //Validate user owns the moment
    Moment.findByIdAndRemove(req.params.moment_id)
    .exec(
      function(err, moment) {
        console.log(moment);
        if (err) {
          res.send(err);
        } else if (!moment) {
          res.json({"message": "No moment found, couldn't delete.", "success": false});
        } else {
          res.json({"message": "Successfully deleted moment", "status": moment});
        }
      });
  });

// *************************************
// ***                               ***
// ***            PROJECTS           ***
// ***                               ***
// *************************************

router.route('/users/:user_id/projects')
  .get(function (req, res) {
    //Get projects of user
    res.json({'message':'not supported yet.'});
  })
  .post(function (req, res) {
    //Add new project to user
    res.json({'message':'not supported yet.'});
  });

router.route('/users/:user_id/projects/:project_id')
  .get(function (req, res) {
    //Get project detailed information
    res.json({'message':'not supported yet.'});
  })
  .put(function (req, res) {
    //Update project info
    res.json({'message':'not supported yet.'});
  })
  .delete(function (req, res) {
    //Delete project
    res.json({'message':'not supported yet.'});
  });

// *************************************
// ***                               ***
// ***          CONNECTIONS          ***
// ***                               ***
// *************************************

router.route('/users/:user_id/connections')
  .get(function (req, res) {
    //Get connections of the user
    res.json({'message':'not supported yet.'});
  })
  .post(function (req, res) {
    //Add new connection to the user
    res.json({'message':'not supported yet.'});
  });

router.route('/users/:user_id/connections/:connection_id')
  .delete(function (req, res) {
    //Delete connection
    res.json({'message':'not supported yet.'});
  });

module.exports = router;
