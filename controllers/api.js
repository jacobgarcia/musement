'use strict';

const express = require('express'),
      multer = require('multer'),
      User = require("models/user.js"),
      Moment = require("models/moment.js"),
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
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong user or password.' });
      } else {
        // if user is found and password is right
        // create a token and --- sign with the user information --- and secret password
        var token = jwt.sign(user, config.secret, {
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

/**************************************************************
 ***                                                        ***
 ***                         USER                           ***
 ***                                                        ***
 ***************************************************************/

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
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
  })
  .put(function (req, res) {
    //UPDATE USER PROFILE
    res.json({'message':'not supported yet.'});
  })
  .delete(function (req, res) {
    //DELETE USER
    res.json({'message':'not supported yet.'});
  });

router.route('/users/:user_id/projects')
  .get(function (req, res) {
    res.json({'message':'not supported yet.'});
  })
  .post(function (req, res) {
    res.json({'message':'not supported yet.'});
  })
  .put(function (req, res) {
    res.json({'message':'not supported yet.'});
  })
  .delete(function (req, res) {
    res.json({'message':'not supported yet.'});
  });

router.route('/users/:user_id/moments')
  .get(function (req, res) {
    res.json({'message':'not supported yet.'});
  })
  .post(function (req, res) {
    res.json({'message':'not supported yet.'});
  })
  .put(function (req, res) {
    res.json({'message':'not supported yet.'});
  })
  .delete(function (req, res) {
    res.json({'message':'not supported yet.'});
  });



/**************************************************************
 ***                                                        ***
 ***                        MOMENTS                         ***
 ***                                                        ***
 ***************************************************************/

router.route('/moments')
  .get(function (req, res) {
    //GET ALL MOMENTS for FEED
    Moment
    .find({})
    .populate('user', '_id name username image') //POPULATE!!!! IMPORTANT
    .exec(function(err, moments) {
        if (err) {
          res.send(err);
        } else {
          res.json(moments);
        }
    });
  });
router.route('/moments/:moment_id')
  .get(function (req, res) {
    Moment.find({user:req.params.moment_id}, function(err, moment) {
        if (err) res.send(err);
        res.json(moment);
    });
  });

/**************************************************************
 ***                                                        ***
 ***                       PROJECTS                         ***
 ***                                                        ***
 ***************************************************************/

 router.route('/projects/:project_id')
   .get(function (req, res) {
     res.json({'message':'not supported yet.'});
   });

 router.route('/projects/:project_id/moments')
   .get(function (req, res) {
     res.json({'message':'not supported yet.'});
   });

module.exports = router;
