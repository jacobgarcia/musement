'use strict';

let express = require('express'),
    User = require("../models/user.js"),
    Project = require("../models/project.js"),
    Moment = require("../models/moment.js"),
    jwt = require('jsonwebtoken'),
    invite = require("../config/createinvitation.js"),
    router = express.Router();

//Register new user
router.route('/users/:user_id')
.post(function (req, res) {
  console.log('Creating user...');
  res.status(501).json({'message':'Not yet supported.', 'success': false});
});

//AUTHENTICATE TO GIVE NEW TOKEN
router.post('/authenticate', function(req, res) {
  // find the user
  // console.dir(req.body);
  User.findOne({
    username: req.body.username //We need to work with username or email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. Wrong user or password.' });
    } else if (user) {
      if (user.password != req.body.password) { // check if password matches
        // console.log(user.password);
        // console.log('Wrong password');
        res.json({ success: false, message: 'Authentication failed. Wrong user or password.' });
      } else {
        // if user is found and password is right
        // create a token and --- sign with the user information --- and secret password
        var token = jwt.sign({"_id": user._id}, "svuadyIUUVas87gdas78ngd87asgd87as", {
          expiresIn: 216000 // expires in 6 hours
        });
        //console.dir(token)
        // return the information including token as JSON
        res.json({
          success: true,
          _id: user._id,
          username: user.username,
          message: 'Logged in',
          token: token
        });
      }
    }

  });
});

// Locale information about user
router.get('/user/locale', function(req, res) {
  if (req.i18n.locale === undefined) {
      // The user is not logged in
      res.json({});
  } else {
      res.json({
        locale: req.i18n.locale
      });
    }
});

router.post('/invitation', function(req, res) {
  invite.insertInvite(req, function(response){
    //  console.dir(response);
     if (response.success) {
       res.json({'message': 'Thanks, please check your email :', 'success': true})
     } else{
       res.json({'message': 'Ops! Please try again :', 'success': false})
     }
   });
});

// ********************************
// **                            **
// **  MIDDLEWARE TOKEN-ACCESS   **
// **                            **
// ********************************

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var token = req.body.token || req.query.token || req.headers['x-access-token']; // check header or url parameters or post parameters for token

  if (token) {
    var decodedToken = jwt.decode(token); //Decode token
    jwt.verify(token, "svuadyIUUVas87gdas78ngd87asgd87as", function(err, decoded) { // decode token
      if (err) {
        return res.status(401).json({'success': false, 'message': 'Failed to authenticate token.'});
      } else { //Send the decoded token to the request body
        req.decoded = decoded; // if everything is good, save to request for use in other routes
        next();
      }
    });
  } else {
    res.status(403).json({success: false, message: 'No token provided.'});
  }
});

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
      res.status(500).json({'error': err, 'success': false});
    } else {
      res.json({message: 'Successfully created' + user.name});
    }
  });
});

//Find by user_id or username
router.route('/users/id=:user_id?') //just when the url has "id=" it will run, otherwise it will look for a username
.get(function (req, res) {
  // console.log("ID");
  User.findById(req.params.user_id,
    '-password', //Return all excepting password
    function(err, user) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else {
        res.json({"user": user, "success": true});
      }
    });

})
.put(function (req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']; // check header or url parameters or post parameters for token
  var decoded = jwt.decode(token);
  var _id = decoded._id;

  //UPDATE USER PROFILE
  res.status(501).json({'message':'Not yet supported.', 'success': false});
})
.delete(function (req, res) {
  //DELETE USER
    //Authenticate logged user is deleting himself
  res.status(501).json({'message':'Not yet supported.', 'success': false});
});

  router.route('/users/:username')
    .get(function (req, res) {
      // console.log("Username: " + req.params.username);
      User.findOne({"username": req.params.username},
        '-password', //Return all excepting password
        function(err, user) {
          if (err) {
            res.status(500).json({'error': err, 'success': false});
          } else if (!user) {
            res.status(404).json({'error': {'message': 'No username found.'}, 'success': false});
          } else {
            res.json({"user": user, "success": true});
          }
        });

    })
    .put(function (req, res) {
      var token = req.body.token || req.query.token || req.headers['x-access-token']; // check header or url parameters or post parameters for token
      var decoded = jwt.decode(token);
      var _id = decoded._id;

      //UPDATE USER PROFILE
      res.status(501).json({'message':'Not yet supported.', 'success': false});
    })
    .delete(function (req, res) {
      //DELETE USER
        //Authenticate logged user is deleting himself
      res.status(501).json({'message':'Not yet supported.', 'success': false});
    });

// *************************************
// ***                               ***
// ***            MOMENTS            ***
// ***                               ***
// *************************************

router.route('/users/:user_id/moments')
  .get(function (req, res) {
    //Get moments of user
    Moment.find({"user": req.params.user_id})
    .sort('-_id')
    .exec(
      function(err, moments) {
        if (err) {
          res.status(500).json({'error': err, 'success': false});
        } else {
          res.json({'moments': moments, success: true});
        }
      });
  })
  .post(function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token']; // check header or url parameters or post parameters for token
    var decoded = jwt.decode(token);
    var decoded_id = decoded._id;
    // console.log('decoded', decoded_id);
    // console.log('params', req.params.user_id);
    if(decoded_id === req.params.user_id) { //Verify that is the user who is adding a moment to himself
      let moment = new Moment();
      // moment.timelapse = req.body.timelapse;
      //moment.project
      moment.description = req.body.description;
      moment.files = req.body.files;
      moment.tags = req.body.tags;
      moment.project = req.body.project;
      moment.question = req.body.question;
      moment.user = req.params.user_id; //Use the user from the url, no need to add it on the body
      // moment.usersHearted = req.body.usersHearted;

      moment.save(function(err) {
        if (err) {
          res.status(500).json({'error': err, 'success': false});
        } else {
          res.json({'message': 'Moment created!', 'moment': moment, 'sucess': true});
        }
      });
    } else {
      res.json({'message': 'You are trying to add a new moment to other person that is not you.', 'success': false})
    }
  });

router.route('/moments/:moment_id')
.get(function (req, res) {
  //Get detailed information of the moment
    //Validate the user adds a moment for him (and not someone else)
  Moment.findById(req.params.moment_id)
  .exec(
    function(err, moment) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else if (!moment) {
        res.json({'message': "No moment found.", 'success': false});
      } else {
        res.json({'moment': moment, 'success': true});
      }
    });
})
.put(function (req, res) {
  //Update moment of the user
  res.status(501).json({'message':'Not yet supported.', 'success': false});
})
.delete(function (req, res) {
  //Remove moment from user
    //Validate user owns the moment
  Moment.findByIdAndRemove(req.params.moment_id)
  .exec(
    function(err, moment) {
      // console.log(moment);
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else if (!moment) {
        res.json({"message": "No moment found, couldn't delete.", "success": false});
      } else {
        res.json({"message": "Successfully deleted moment", "status": moment});
      }
    });
});

router.route('/moments/:moment_id/likes')
.get(function (req, res) { //Get detailed information of the moment
  //TODO: Validate the user adds a moment for him (and not someone else)
  Moment.findById(req.params.moment_id)
  .exec(
    function(err, moment) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else if (!moment) {
        res.json({"message": "No moment found.", "success": false});
      } else {
        res.json(moment);
      }
    });
})
.post(function (req, res) {
  Moment.findByIdAndUpdate(req.params.moment_id, {
            $addToSet: { usersHeart: req.body.hearter }
        }, function(err) {
            if (err) {
              res.status(500).json({'error': err, 'success': false});
            } else {
              res.json({"message": "Successfully liked", "success": true});
            }
        });
})
.delete(function (req, res) { //Unheart
  //Remove like from moment
    //Validate user owns the moment
    Moment.findByIdAndUpdate(req.params.moment_id, {
              $pull: {usersHeart: req.body.hearter}
          }, function(err) {
              if (err) {
                res.status(500).json({'error': err, 'success': false});
              } else {
                res.json({"message": "Successfully un-liked", "success": true});
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
    Project.find({'user': req.params.user_id})
    .exec(
      function(err, projects) {
        if (err) {
          res.status(500).json({'error': err, 'success': false});
        } else {
          res.json(projects);
        }
      });

  })
  .post(function (req, res) {
    let project = new Project();
    project.title = req.body.title;
    project.description = req.body.description;
    project.users = req.body.users;

    project.save(function(err) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else {
        res.json({message: 'Moment created!', moment: project});
      }
    });
  });

router.route('/projects/:project_id')
  .get(function (req, res) {
    Project.findById(req.params.project_id)
    .populate('users','image username')
    .exec(function (err, project) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else {
        res.json(project);
      }
    })
  })
  .put(function (req, res) {
    //Update project info
    res.status(501).json({'message':'Not yet supported.', 'success': false});
  })
  .delete(function (req, res) {
    //Delete project
    Project.findByIdAndRemove(req.params.project_id)
    .exec(
      function(err, project) {
        // console.log(moment);
        if (err) {
          res.status(500).json({'error': err, 'success': false});
        } else if (!project) {
          res.json({"message": "No moment found, couldn't delete.", "success": false});
        } else {
          res.json({"message": "Successfully deleted moment", "status": project});
        }
      });
  });

router.route('/projects/:project_id/moments')
  .get(function (req, res) {
    Project.findById(req.params.project_id)
    .populate('moments')
    .exec(function (err, project) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else {
        res.json(project);
      }
    });
  })
  .post(function (req, res) {
    Project.findByIdAndUpdate(req.params.project_id,
      {
          $addToSet: {moments: req.body.moment}
      }, function(err) {
          // console.log('YAY!!!');
          // console.dir(req.body);
          if (err) {
            res.status(500).json({'error': err, 'success': false});
          } else {
            res.json({"message": "Successfully added moment to project", "success": true});
          }
      });
    //Get project detailed information
  })

// *************************************
// ***                               ***
// ***          CONNECTIONS          ***
// ***                               ***
// *************************************

router.route('/users/:user_id/connections')
  .get(function (req, res) {
    User.findById(req.params.user_id,
      'followers',
      function(err, user) {
        if (err) {
          res.status(500).json({'error': err, 'success': false});
        } else {
          res.json(user);
        }
      });
    //Get connections of the user
    res.status(501).json({'message':'Not yet supported.', 'success': false});
  })
  .post(function (req, res) {
    //Add new connection to the user
    res.status(501).json({'message':'Not yet supported.', 'success': false});
  });

router.route('/users/:user_id/connections/:connection_id')
  .delete(function (req, res) {
    //Delete connection
    res.status(501).json({'message':'Not yet supported.', 'success': false});
  });

// *************************************
// ***                               ***
// ***           INTERESTS           ***
// ***                               ***
// *************************************

router.route('/users/:user_id/interests/moments')
.get(function(req, res) {
  //
  //NOTICE: Not yet implemented
  //
  Moment.find()
  .populate('user','username name surname')
  .sort('-_id')
  .exec(function(err, moments) {
    if (err) {
      res.status(500).json({'error': err, 'success': false});
    } else {
      res.json({'moments': moments, 'success': true});
    }
  })
});

module.exports = router;
