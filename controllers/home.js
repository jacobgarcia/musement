var express = require('express');
const multer = require('multer');

var router = express.Router();
var upload = multer({
  dest: './uploads/user/u0000/u0'
});

const newMoment = require('config/createmoment.js')

//================================== MIDDLEWARES ===============================
var Moment = require("models/moment.js");
const ensureAuth = require('middlewares/auth.js');
const populate = require('helpers/populate.js');

/*
 * GET momentlist
 */
router.get('/momentlist', ensureAuth, (req, res) => {
  populate.populate().exec(function(err, moments) {
    res.end(JSON.stringify(moments));
  });

});

router.get('/', ensureAuth, (req, res) => {
  res.render('home', {image: req.user.image});
});

router.post('/', ensureAuth, upload.single('fileName'), function(req, res) {
  //res.render('home');
  newMoment.insertMoment(req);
  console.log(req.file);
  console.log("uploaded");
  res.redirect('/home');
});

module.exports = router;
