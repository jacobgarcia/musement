var express = require('express');
var ObjectId = require('mongodb').ObjectID;
const multer = require('multer');

var router = express.Router();

var upload = multer({
  dest: './uploads/user/profile'
});

//================================== MIDDLEWARES ===============================
const ensureAuth = require('middlewares/auth.js');

//================================== HELPERS ===============================
const populate = require('helpers/populate.js');

//================================== CONFIG ===============================
const update = require('config/updatepicture.js');

/*
 * GET momentlist
 */
router.get('/momentlist', ensureAuth, (req, res) => {
  populate.populate({"user":ObjectId(req.user.id)}).exec(function(err, moments) {
    res.end(JSON.stringify(moments));
  });
});

router.get('/', ensureAuth, (req, res) => {
  res.render('profile', {user: req.user.username, image: req.user.image});
});

router.post('/', ensureAuth, upload.single('fileName'), function(req, res) {
  update.setPicture(req);
  res.redirect('/profile');
});

module.exports = router;
