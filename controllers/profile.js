var express = require('express');
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();

//================================== MIDDLEWARES ===============================
const ensureAuth = require('middlewares/auth.js');
const populate = require('helpers/populate.js');

/*
 * GET momentlist
 */
router.get('/momentlist', ensureAuth, (req, res) => {
  populate.populate({"user":ObjectId("56cb30bddd08126a09f28f69")}).exec(function(err, moments) {
    res.end(JSON.stringify(moments));
  });
});

router.get('/', ensureAuth, (req, res) => {
  res.render('profile');
});

module.exports = router;
