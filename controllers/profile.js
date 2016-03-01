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
  populate.populate({"user":ObjectId(req.user.id)}).exec(function(err, moments) {
    res.end(JSON.stringify(moments));
  });
});

router.get('/', ensureAuth, (req, res) => {
  res.render('profile', {user: req.user.username});
});

module.exports = router;
