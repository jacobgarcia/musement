var Moment = require("models/moment.js");
var User = require("models/user.js");

var insertMoment = function(req) {
  // Create moment
  var newMoment = new Moment();

  // Set the information needed
  newMoment.description = req.body.description;
  newMoment.timelapse = req.body.totalTime;
  newMoment.user = req.user.id;
  newMoment.heart = 0;

  if(req.file != null)
    newMoment.attachement.push(req.file.path);

  console.log(newMoment.description + ' ' + newMoment.timelapse + ' ' + ' ' + req.user.id);

  newMoment.save(function(error, moment) {
    if (error)
      console.log("Error when creating a new moment. Please verify this.");
    else {
      //Moment id if success
      console.log(moment.id);
    }
  });
}
module.exports = {
  insertMoment: insertMoment
}
