var express = require('express');
var router = express.Router();
const newInvite = require('config/createinvitation.js');


/*
 * POST Invitations
 */


router.post('/', function(req, res) {
  newInvite.insertInvite(req);
  console.log("Invited");
  res.redirect('/thanks');
});

module.exports = router;
