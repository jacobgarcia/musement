var Moment = require("models/moment.js");
var User = require("models/user.js");

var insertMoment = function(req, user) {
  // Create moment
  var newMoment = new Moment();

  // Set the information needed
  newMoment.description = req.body.description;
  newMoment.timelapse = req.body.totalTime;
  newMoment.attachement.reference = req.body.fileName;
  newMoment.user = req.user.id;

  console.log(newMoment.description + ' ' + newMoment.timelapse + ' ' + newMoment.attachement.reference + ' ' + req.user.id);

  newMoment.save(function(error, moment) {
    if (error) {
      console.log("Error when creating a new moment. Please verify this.");
    } else {
      console.log(moment.id);
    }
  });
}

module.exports = {
  insertMoment: insertMoment
}
