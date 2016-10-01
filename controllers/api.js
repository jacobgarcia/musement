'use strict'

let express = require('express'),
    jwt = require('jsonwebtoken'),
    multer = require('multer'),
    path = require('path'),
    router = express.Router()

//Models
let User = require("../models/user.js"),
    Project = require("../models/project.js"),
    Moment = require("../models/moment.js"),
    Tag = require("../models/tag.js")

//config files
let invite = require("../config/createinvitation.js"),
    jwtConfig = require("../config/jwt.js")

//storage and upload
var storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'public/uploads/'),
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
})
var upload = multer({storage: storage}).single('file') //single file upload using this variable

//TODO: this should be accessed only with a valid token
router.post('/upload', function(req, res) { // API path that will upload the files
  upload(req, res, function(err){
    if(err)
    res.json({error_code:1, error_desc:err});
    else
    res.json({error_code:0, file_name:req.file.filename});
  })
})

//register NEW USER
router.post('/signup', function(req, res){
  User.findOne({ $or: [ { 'email': req.body.email.toLowerCase() }, { 'username': req.body.username.toLowerCase() } ]}, 'email username')
  .exec(function (err, user) { // if there are any errors, return the error
    if (err) {
      res.status(500).json({'error': err, 'success': "false", 'message': "Error finding that user or email."}); // return shit if the user is already registered
    } else {
      if (user) { //TODO: it would be better to validate all this with mongoose
        if (user.username == req.body.username && user.email == req.body.email)
          res.status(400).json({'message': "That email and username are already registered. Try with another ones."})
        else if (user.email == req.body.email)
          res.status(400).json({'message': "That email is already registered. Try with another one."})
        else if (user.username == req.body.username)
          res.status(400).json({'message': "That username is already registered. Try with another one."})
      } else {
        new User({
          email: req.body.email,
          surname: req.body.surname,
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          image: req.body.image || null
        })
        .save(function (err, user) { // Save the user
          if (err)
            res.status(500).json({'error': err, 'message': "Could not save user."});
          else { // Create a token and --- sign with the user information --- and secret password
            var token = jwt.sign({"_id": user._id}, jwtConfig.secret, { expiresIn: 216000 }) //Expires in 60 hours
            res.status(200).json({ '_id': user._id, 'username': user.username, 'token': token }) // Return the information including token as JSON
          }
        })
      }
    }
  })
})
//AUTHENTICATE TO GIVE NEW TOKEN
router.post('/authenticate', function(req, res) {
  console.log(req.body);
  if (!req.body || !(req.body.email || req.body.username))
    return res.status(400).json({'message': "Authentication failed. No user specified." });
  User.findOne({ $or: [ { 'email': req.body.email.toLowerCase() }, { 'username': req.body.username.toLowerCase() } ] })
  .exec(function(err, user) {
    if (err)
      res.status(500).json({'error': err})
    else if (!user)
      res.status(401).json({'message': "Authentication failed. Wrong user or password."})
    else {
      if (!user.comparePassword(req.body.password)) // check if password matches
        res.status(401).json({'message': "Authentication failed. Wrong user or password."})
      else {
        var token = jwt.sign({"_id": user._id}, jwtConfig.secret, { expiresIn: 216000 }) // expires in 6 hours
        res.status(200).json({ '_id': user._id, 'username': user.username, 'token': token })  // Return the information including token as JSON
      }
    }
  })
})

router.post('/invitation', function(req, res) {
  invite.insertInvite(req, function(response){
    if (response.success)
      res.status(201).json({'message': 'Thanks, please check your email :'})
    else
      res.status(500).json({'message': 'Ops! Please try again :'})
  })
})
// Tag consulting
router.get('/tags', function(req, res){
  Tag.find({})
  .exec(function(err, tags){
    if (err)
    res.status(500).json({'error': err})
    else
    res.json(tags);
  })
})
// Members consulting
router.get('/members', function(req, res) {
  User.find({}, 'name surname username image', function(err, users){
    res.json(users);
  })
})

/*************************************
***                                ***
***          MIDDLEWARE           ***
***                                ***
*************************************/

<<<<<<< HEAD
//MIDDLEWARE TOKEN-ACCESS
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var token = req.body.token || req.query.token || req.headers['x-access-token']; // check header or url parameters or post parameters for token
//
//   if (token) {
//     var decodedToken = jwt.decode(token);
//
//     jwt.verify(token, "svuadyIUUVas87gdas78ngd87asgd87as", function(err, decoded) { // decode token
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
=======
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var token = req.headers['x-access-token']; // check header or url parameters or post parameters for token

  if (token) {
    var decodedToken = jwt.decode(token); //Decode token
    jwt.verify(token, jwtConfig.secret, function(err, decoded) { // decode token
      if (err) {
        res.status(401).json({'success': false, 'message': 'Failed to authenticate token.'});
      } else { //Send the decoded token to the request body
        req.U_ID = decoded._id; //Save the decoded user_id from the token to use in next routes
        next();
      }
    })
  } else {
    res.status(403).json({'message': "No token provided"});
  }
});
>>>>>>> dev

/*************************************
***                                ***
***              USER              ***
***                                ***
*************************************/

router.route('/users')
<<<<<<< HEAD
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
        res.send("err": err, "success": false);
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
          res.send("err": err, "success": false);
        } else {
          res.json(user);
        }
      });
=======
.post(function (onreq, res) {
  new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    bornDate: req.body.bornDate,
    username: req.body.username,
    image: req.body.image
  })
  .save(function (err, user) {
    if (err)
    res.status(500).json({'error': err, 'success': false});
    else
    res.status(201).json({message: 'Successfully created new user' + user.name});
  })
})

router.route('/users/u=:username?')
.get(function (req, res) {
  User.findOne({'username': req.params.username}, '-password') //Return all excepting password
  .populate('projects tags')
  .exec(function(err, user) {
    if (err) {
      res.status(500).json({'error': err, 'success': false});
    } else if (!user) {
      res.status(404).json({'error': {'message': 'No username found.'}, 'success': false});
    } else {
      res.json({"user": user, "success": true});
    }
>>>>>>> dev
  })
})

router.route('/users/:user_id') //just when the url has "id=" it will run, otherwise it will look for a username
.get(function (req, res) {
  User.findById(req.params.user_id, '-password') //Return all excepting password
  .populate('projects', 'name description color')
  .exec(function(err, user) {
    if (err)
    res.status(500).json({'error': err})
    else
    res.status(200).json({'user': user})
  })
})
.put(function (req, res) {
  //TODO: Update user
  res.status(501).json({'message':'Not yet supported.'})
})
.delete(function (req, res) {
  //TODO: *Deactivate* user, validate user us deleting himself
  res.status(501).json({'message':'Not yet supported.'})
})

/*************************************
***                               ***
***            MOMENTS            ***
***                               ***
*************************************/

router.route('/users/:user_id/moments')
<<<<<<< HEAD
  .get(function (req, res) {
    //Get moments of user
      //Validate user is accessing it's own moments or of people he follows
    Moment.find({"user": req.params.user_id})
    .exec(
      function(err, moments) {
        if (err) {
          res.send("err": err, "success": false);
        } else {
          res.json(moments);
        }
      });
  })
  .post(function (req, res) {
    let moment = new Moment();
    moment.timelapse = req.body.timelapse;
    moment.description = req.body.description;
    moment.moment_type = req.body.moment_type;
    moment.attachement = req.body.attachement;
    moment.user = req.params.user_id;
    moment.save(function(err) {
      if (err) {
        res.send("err": err, "success": false);
      } else {
        res.json({message: 'Moment created!', moment: moment});
      }
    });
    //Add new moment to user, can add within project
  });

router.route('/moments/:moment_id')
  .get(function (req, res) {
    //Get detailed information of the moment
      //Validate the user adds a moment for him (and not someone else)
    Moment.findById(req.params.moment_id)
    .exec(
      function(err, moment) {
        if (err) {
          res.send("err": err, "success": false);
        } else if (!moment) {
          res.json({"message": "No moment found.", "success": false});
        } else {
          res.json(moment);
        }
      });
=======
.get(function (req, res) { //Get moments of user
  Moment.find({"user": req.params.user_id}, '-feedback.user -feedback.text -feedback.comment -feedback.attachments -feedback.upvotes')
  .populate('user tags','image name username')
  .sort('-_id')
  .exec(function(err, moments) {
    if (err)
    res.status(500).json({'error': err});
    else
    res.status(200).json({'moments': moments});
  })
})
.post(function (req, res) {
  if(req.U_ID !== req.params.user_id) { //Verify that is the user who is adding a moment to himself
    return res.status(401).json({'error':{'errmsg': "You're trying to add a moment to otherone that is not you"}})
  }
  new Moment({
    description: req.body.description,
    attachments: req.body.attachments,
    tags: req.body.tags,
    project: req.body.project,
    question: req.body.question,
    user: req.U_ID, //Use user from the req U_ID (this cannot be changed from the client)
  })
  .save(function(err, moment) {
    if (err)
    res.status(500).json({'error': err, 'success': false});
    else
    res.status(201).json({'message': 'Moment created!', 'moment': moment, 'success': true});
  })
});

router.route('/moments/:moment_id')
.get(function (req, res) {
  //TODO: validate the user adds a moment for him (and not someone else)
  Moment.findById(req.params.moment_id)
  .populate('user tags','name surname username image')
  .populate({
    path: 'feedback',
    populate: {
      path: 'user',
      model: 'User',
      select: 'username'
    }
>>>>>>> dev
  })
  .exec(function(err, moment) {
    if (err)
    res.status(500).json({'error': err});
    else if (!moment)
    res.status(404).json({'message': "No moment found."});
    else
    res.status(200).json({'moment': moment});
  })
<<<<<<< HEAD
  .delete(function (req, res) {
    //Remove moment from user
      //Validate user owns the moment
    Moment.findByIdAndRemove(req.params.moment_id)
    .exec(
      function(err, moment) {
        // console.log(moment);
        if (err) {
          res.send("err": err, "success": false);
        } else if (!moment) {
          res.json({"message": "No moment found, couldn't delete.", "success": false});
        } else {
          res.json({"message": "Successfully deleted moment", "status": moment});
        }
      });
  });

  router.route('/moments/:moment_id/likes')
    .get(function (req, res) {
      //Get detailed information of the moment
        //Validate the user adds a moment for him (and not someone else)
      Moment.findById(req.params.moment_id)
      .exec(
        function(err, moment) {
          if (err) {
            res.send("err": err, "success": false);
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
                  res.send("err": err, "success": false);
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
                    res.send("err": err, "success": false);
                  } else {
                    res.json({"message": "Successfully un-liked", "success": true});
                  }
              });
    });
=======
})
.put(function (req, res) {
  //TODO: edit moment of the user
  res.status(501).json({'message':'Not yet supported.'})
})
.delete(function (req, res) {
  //TODO: Validate user owns the moment
  res.status(501).json({'message':'Not yet supported.'})
})

router.route('/moments/:moment_id/feedback')
.get(function (req, res) { //Get detailed information of the moment
  Moment.findById(req.params.moment_id, 'feedback')
  .populate('feedback')
  .sort('-feedback._id')
  .exec(function(err, moment) {
    if (err)
    res.status(500).json({'error': err});
    else if (!moment)
    res.status(404).json({'message': "No moment found."});
    else
    res.status(200).json({'feedback':moment.feedback})
  });
})
.post(function (req, res) {
  let feedback = req.body.text;
  //TODO: add attachments into the feedback
  Moment.findById(req.params.moment_id) //User, comment
  .update({ $addToSet: { 'feedback': {'user': req.U_ID, 'text': feedback} } })
  .exec(function(err) {
    if (err) {
      res.status(500).json({'error': err});
    } else {
      res.status(201).json({'message': "Feedback sent."});
    }
  });
});
>>>>>>> dev

router.route('/moments/:moment_id/likes')
.get(function (req, res) {
  Moment.findById(req.params.moment_id, 'likes')
  .exec(function(err, moment) {
    if (err)
    res.status(500).json({'error': err})
    else if (!moment)
    res.status(404).json({'error': {'message': "No moment found."}})
    else
    res.status(200).json({'likes': moment.likes})
  })
})
.post(function (req, res) {
  Moment.findById(req.params.moment_id)
  .update({ $addToSet: { hearts: req.U_ID } })
  .exec(function(err) {
    if (err)
    res.status(500).json({'error': err})
    else if (result.nModified == 0) //If the moment wasn't modified, means it didn't liked
    res.status(400).json({'message': "Already liked."})
    else
    res.status(201).json({'message': "Successfully liked"})
  })
})
.delete(function (req, res) { //Unheart
  Moment.findByIdAndUpdate(req.params.moment_id, {$pull: {usersHeart: req.U_ID}})
  .exec(function(err) {
    if (err)
    res.status(500).json({'error': err})
    else
    res.status(200).json({"message": "Successfully un-liked"})
  })
})

<<<<<<< HEAD
router.route('/users/:user_id/projects')
  .get(function (req, res) {
    //Get projects of user
    Project.find({"user": req.params.user_id})
    .exec(
      function(err, projects) {
        if (err) {
          res.send("err": err, "success": false);
        } else {
          res.json(projects);
        }
      });
=======
/*************************************
***                                ***
***            PROJECTS            ***
***                                ***
*************************************/
>>>>>>> dev

//Get projects by username
router.route('/users/u=:username/p=:project')
.get(function (req, res) {
  User.findOne({'username': req.params.username})
  .exec(function(err, user){
    if (err)
    res.status(500).json({'err':err})
    else if (!user)
    res.status(404).json({'err':{'errmsg': "No user found"}})
    else {
      Project.findOne({'name': req.params.project, 'members': user._id})
      .exec(function(err, project) {
        if (err)
        res.status(500).json({'error': err});
        else
        res.status(200).json({'project': project});
      })
    }
  })
})

<<<<<<< HEAD
    project.save(function(err) {
      if (err) {
        res.send("err": err, "success": false);
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
        res.send("err": err, "success": false);
      } else {
        res.json(project);
      }
    })
=======
router.route('/users/:user_id/projects')
.get(function (req, res) { //remove like from moment
  Projects.find({'members':req.params.user_id})
  .populate('members','name username surname image color')
  .exec(function(err, projects) {
    if (err)
      res.status(500).json({'err':err})
    else
      res.status(200).json({'projects': projects})
  })
})
.post(function (req, res) {
  let project = new Project({
    admin: req.U_ID,
    category: req.body.category,
    description: req.body.description,
    name: req.body.name,
    color: req.body.color
  })
  if (!req.body.members)
    project.members = [req.U_ID]
  else
    project.members = req.body.members.push(req.U_ID)
  project.save(function(err, project) {
    if (err)
      return res.status(500).json({'err':err})
    User.update(
      { _id: {$in: project.members} },
      { $push: {"projects":  project._id} },
      { multi: true }
    )
    .exec(function(err){
      if (err)
        res.status(500).json({'error': err,});
      else
        res.status(201).json({message: 'Project created!', project: project});
    })
  })
})

router.route('/projects/:project_id')
.get(function (req, res) {
  Project.findById(req.params.project_id)
  .lean()
  .populate('members moments', 'name surname username image color')
  .populate({
    path: 'moments',
    model: 'Moment',
    populate: {
      path: 'user',
      model: 'User',
      select: 'name username surname image color'
    }
>>>>>>> dev
  })
  .exec(function (err, project) {
    if (err) {
      res.status(500).json({'error': err, 'success': false});
    } else {
      res.json(project);
    }
  })
<<<<<<< HEAD
  .delete(function (req, res) {
    //Delete project
    Project.findByIdAndRemove(req.params.project_id)
    .exec(
      function(err, project) {
        // console.log(moment);
        if (err) {
          res.send("err": err, "success": false);
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
        res.send("err": err, "success": false);
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
          console.log('YAY!!!');
          console.dir(req.body);
          if (err) {
            res.send("err": err, "success": false);
          } else {
            res.json({"message": "Successfully added moment to project", "success": true});
          }
      });
    //Get project detailed information
=======
})
.put(function (req, res) {
  //TODO: Update project info
  res.status(501).json({'message':'Not yet supported.'})
})
.delete(function (req, res) {
  //TODO: Delete project
  res.status(501).json({'message':'Not yet supported.'})
})

router.route('/projects/:project_id/moments')
.get(function (req, res) {
  Moment.find({'project':req.params.project_id})
  .populate('user tags')
  .exec(function (err, moments) {
    if (err) {
      res.status(500).json({'error': err});
    } else {
      res.json(moments);
    }
  })
})
.post(function (req, res) {
  //TODO: validate that the user owns this project
  Project.findByIdAndUpdate(req.params.project_id, { $addToSet: {moments: req.body.moment} })
  .exec(function(err) {
    if (err)
    res.status(500).json({'error': err, 'success': false});
    else
    res.json({"message": "Successfully added moment to project", "success": true})
>>>>>>> dev
  })
})

/*************************************
***                                ***
***           CONNECTIONS          ***
***                                ***
*************************************/

router.route('/users/:user_id/connections')
<<<<<<< HEAD
  .get(function(req, res) {
    //Get connections of the user
    res.json({'message':'not supported yet.'});
  })
  .post(function (req, res) {
    //Add new connection to the user
    res.json({'message':'not supported yet.'});
  });

  router.route('/users/:user_id/connections/moments')
    .get(function(req, res) {
      //Get connections of the user
      res.json({'message':'not supported yet.'});
    })
    .post(function (req, res) {
      //Add new connection to the user
      res.json({'message':'not supported yet.'});
    });
=======
.get(function(req,res){
  //TODO: Get connections of the user
  res.status(501).json({'message':'Not yet supported.', 'success': false});
})
.post(function (req, res) {
  //TODO: Add new connection to the user
  res.status(501).json({'message':'Not yet supported.', 'success': false});
})

/*************************************
***                                ***
***            INTERESTS           ***
***                                ***
*************************************/

router.route('/users/:user_id/interests/moments')
.get(function(req, res) {
  //TODO: Not yet implemented
  Moment.find()
  .populate('user project tags','username name surname image color')
  // .populate('tags')
  .sort('-_id')
  .exec(function(err, moments) {
    if (err)
      res.status(500).json({'error': err });
    else
      res.status(200).json({'moments': moments});
  })
})
>>>>>>> dev

module.exports = router;
