var express = require('express');
const multer = require('multer');

var router = express.Router();
var upload = multer({
  dest: './public/uploads/0000/0'
});

const newMoment = require('config/createmoment.js')

//================================== MIDDLEWARES ===============================
var Moment = require("models/moment.js");
const ensureAuth = require('middlewares/auth.js');

/*
 * GET momentlist
 */
router.get('/momentlist', ensureAuth, (req, res) => {
  /* The populate first parameter refers to the 'foreign key', the other 2 params are the only fields that will be populated */
  Moment.find().populate('user', 'username image').lean().exec(function(err, moments) {
    //res.render('home');
    /* WARNING: This returns all the moments in the database, REMEMBER to add later a paging file in FRONT END */
    res.end(JSON.stringify(moments));
  });

});

router.get('/', ensureAuth, (req, res) => {
  res.render('home');
});

router.post('/', ensureAuth, upload.single('fileName'), function(req, res) {
  res.render('home');
  newMoment.insertMoment(req, null);
  console.log(req.file);
  console.log("uploaded");
});

module.exports = router;
