var express = require('express');
var router = express.Router();

const ensureAuth = require('middlewares/auth.js');

router.get('/', ensureAuth, function(req, res) {
  res.render('chat', {username: req.user.username, image: req.user.image});
  failureRedirect: '/login'
});

module.exports = router;
