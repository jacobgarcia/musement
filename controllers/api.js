'use strict';
//TODO: Update API routes names

let express = require('express'),
  jwt = require('jsonwebtoken'),
  multer = require('multer'),
  path = require('path'),
  User = require("../models/user.js"),
  Project = require("../models/project.js"),
  Moment = require("../models/moment.js"),
  Tag = require("../models/tag.js"),
  invite = require("../config/createinvitation.js"),
  router = express.Router();

/* MULTER DEFINITIONS. PLEASE DONT TOUCH THIS */
/* Multer's disk storage settings */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

/* Single file upload using this variable */
var upload = multer({storage: storage}).single('file');

/* API path that will upload the files */
router.post('/upload', function(req, res) {
    upload(req, res, function(err){
        if(err)
          res.json({error_code:1, error_desc:err});
        else
          res.json({error_code:0, file_name:req.file.filename});
    });
});

/********************************************/
//Register new user
router.route('/users/:user_id')
.post(function (req, res) {
  console.log('Creating user...');
  res.status(501).json({'message':'Not yet supported.', 'success': false});
});

router.post('/signup', function(req, res){
  // find a user whose email or username is the same as the forms email/username respectively
  // we are checking to see if the user trying to signup already exists
  User.findOne({
      $or: [
      { 'email': req.body.email.toLowerCase() }, //SET EMAIL AND USERNAME TO LOWERCASE
      { 'username': req.body.username.toLowerCase() } //SET EMAIL AND USERNAME TO LOWERCASE
    ]
  }, {'email': 1, 'username': 1}, function (err, docs) { // if there are any errors, return the error
      if (err) {
        res.status(500).json({'error': err, 'success': "false", 'message': "Error finding that user or email."}); // return shit if the user is already registered
      } else {
        if (docs) {
          if (docs.username == req.body.username && docs.email == req.body.email) {
            res.status(400).json({'success': false, 'message': "That email and username are already registered. Try with another ones." });
          } else if (docs.email == req.body.email) {
              res.status(400).json({'success': false, 'message': "That email is already registered. Try with another one." });
          } else if (docs.username == req.body.username) {
              res.status(400).json({'success': false, 'message': "That username is already registered. Try with another one." });
          }
        } else {

            var newUser = new User();
            // set the user's local credentials
            newUser.email = req.body.email;
            newUser.surname = req.body.surname;
            newUser.name = req.body.name;
            newUser.username = req.body.username;
            newUser.password = newUser.generateHash(req.body.password);
            newUser.image = req.body.image || "/static/img/default.jpg"; //TODO: possible change of path
            // Save the user
            newUser.save(function (err) {
                if (err) {
                  res.status(500).json({'success': false, 'error': err, 'message': "Could not save user."});
                } else {
                  // Create a token and --- sign with the user information --- and secret password
                  var token = jwt.sign({"_id": newUser._id}, "svuadyIUUVas87gdas78ngd87asgd87as", {
                    expiresIn: 216000 // expires in 6 hours
                  });

                  // Return the information including token as JSON
                  res.json({
                    'success': true,
                    '_id': newUser._id,
                    'username': newUser.username,
                    'message': 'Logged in',
                    'token': token
                  });
                }
            });
        }
      }
  });
});

//AUTHENTICATE TO GIVE NEW TOKEN
router.post('/authenticate', function(req, res) {
  /* Verify that the username is really there. Done for security reasons. */
  if (req.body.username || req.body.email) {
    User.findOne({
        $or: [
        { 'email': req.body.email },
        { 'username': req.body.username }
      ]
    }, function(err, user) {
      if (err) {
        res.json({'error': err })
      } else if (!user) {
        res.json({ success: false, message: 'Authentication failed. Wrong user or password.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) { // check if password matches
          res.json({ success: false, message: 'Authentication failed. Wrong user or password.' });
        } else {
          // if user is found and password is right
          // create a token and --- sign with the user information --- and secret password
          var token = jwt.sign({"_id": user._id}, "svuadyIUUVas87gdas78ngd87asgd87as", {
            expiresIn: 216000 // expires in 6 hours
          });
          // Return the information including token as JSON
          res.json({
            'success': true,
            '_id': user._id,
            'username': user.username,
            'message': 'Logged in',
            'token': token
          });
        }
      }
    });
  } else {
    /* In case the username field is in blank, end the connection with the client */
    res.json({ 'success': false, 'message': "Authentication failed. No user specified." });
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

// Tag consulting
router.get('/tags', function(req, res){
  Tag.find({}, function(err, tags){
    res.json(tags);
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
        req.U_ID = decoded._id; //Save the decoded user_id from the token to use in next routes
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
.post(function (onreq, res) {
  var user = new User();

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


router.route('/users/u=:username?')
.get(function (req, res) {
  console.log('USERNAME: '+ req.params.username);
  // console.log("Username: " + req.params.username);
  User.findOne({'username': req.params.username}, '-password') //Return all excepting password
  .populate('projects')
  .exec(function(err, user) {
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

//Find by user_id or username
router.route('/users/:user_id') //just when the url has "id=" it will run, otherwise it will look for a username
.get(function (req, res) {
  // console.log("ID");
  User.findById(req.params.user_id, '-password') //Return all excepting password
  .populate('projects', 'title')
  .exec(
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

// *************************************
// ***                               ***
// ***            MOMENTS            ***
// ***                               ***
// *************************************

router.route('/users/:user_id/moments')
  .get(function (req, res) {
    //Get moments of user
    Moment.find({"user": req.params.user_id}, '-feedback.user -feedback.text -feedback.comment -feedback.attachments -feedback.upvotes')
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
    var user_id = req.U_ID;

    if(user_id === req.params.user_id) { //Verify that is the user who is adding a moment to himself
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
          res.json({'message': 'Moment created!', 'moment': moment, 'success': true});
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
  .populate('user','name surname username image')
  .populate({
    path: 'feedback',
      populate: {
        path: 'user',
        model: 'User',
        select: 'username'
      }
   })
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
  //Edit moment of the user
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

router.route('/moments/:moment_id/feedback')
.get(function (req, res) { //Get detailed information of the moment
  //TODO: Validate the user adds a moment for him (and not someone else)
  Moment.findById(req.params.moment_id, 'feedback')
  .sort('-feedback._id')
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

  let feedback = req.body.text;
  let attachments = req.body.attachments;

  Moment.findById(req.params.moment_id) //User, comment
  .update({ $addToSet: { 'feedback': {'user': req.U_ID, 'text': feedback} } })
  .exec(function(err) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else {
        res.json({'message': "Feedback sent.", "success": true});
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
  console.log(req.user);
  Moment.findById(req.params.moment_id)
  .update({ $addToSet: { hearts: req.U_ID } })
  .exec(function(err, result) {
      if (err) {
        res.status(500).json({'error': err, 'success': false});
      } else if (result.nModified == 0) {
        res.json({'message': "Already liked.", 'success': false});
      } else {
        res.json({'message': "Successfully liked", 'success': true});
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
                res.json({"message": "Successfully un-liked", 'success': true});
              }
          });
});

// router.route('/moments/:moment_id/upvotes')
// .get(function (req, res) { //Get detailed information of the moment
//   //TODO: Validate the user adds a moment for him (and not someone else)
//   Moment.findById(req.params.moment_id)
//   .exec(
//     function(err, moment) {
//       if (err) {
//         res.status(500).json({'error': err, 'success': false});
//       } else if (!moment) {
//         res.json({"message": "No moment found.", "success": false});
//       } else {
//         res.json(moment);
//       }
//     });
// })
// .post(function (req, res) {
//   console.log(req.user);
//   Moment.findById(req.params.moment_id)
//   .update({ $addToSet: { hearts: req.U_ID } })
//   .exec(function(err, result) {
//       if (err) {
//         res.status(500).json({'error': err, 'success': false});
//       } else if (result.nModified == 0) {
//         res.json({'message': "Already liked.", 'success': false});
//       } else {
//         res.json({'message': "Successfully liked", "success": true});
//       }
//   });
// })
// .delete(function (req, res) { //Unheart
//   //Remove like from moment
//     //Validate user owns the moment
//     Moment.findByIdAndUpdate(req.params.moment_id, {
//               $pull: {usersHeart: req.body.hearter}
//           }, function(err) {
//               if (err) {
//                 res.status(500).json({'error': err, 'success': false});
//               } else {
//                 res.json({"message": "Successfully un-liked", "success": true});
//               }
//           });
// });

// *************************************
// ***                               ***
// ***            PROJECTS           ***
// ***                               ***
// *************************************

//Get projects by username
router.route('/users/u=:username/p=:project')
  .get(function (req, res) {
    //Get projects of user
    User.findOne({'username': req.params.username}, 'projects')
    .populate('projects')
    .exec(function(err, user) {

      var hasProject = false;

      user.projects.filter(function(project) {
        hasProject = (project._doc.title || project.title_) == req.params.project;
      });

      if (err || !hasProject) {
        res.status(500).json({'error': err || "No project found", 'success': false});
      } else {
        res.json({'project': user.projects[0], 'success': true});
      }
    });

  })

router.route('/users/:user_id/projects')
  .get(function (req, res) {
    //Get projects of user
    User.find({'_id': req.params.user_id}, 'projects')
    .populate('projects', 'title')
    .exec(
      function(err, projects) {
        if (err) {
          res.status(500).json({'error': err, 'success': false});
        } else {
          res.json({'projects': projects, 'success': true});
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
        res.json({message: 'Project created!', moment: project});
      }
    });
  });

router.route('/projects/:project_id')
  .get(function (req, res) {
    Project.findById(req.params.project_id)
    .lean()
    .populate('members moments', 'name surname username image')
    .populate({
      path: 'moments',
      model: 'Moment',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name username surname image'
      }
     })
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
  .populate('user','username name surname image')
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
