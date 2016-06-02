var Guest = require("models/guest.js");

var insertInvite = function(req) {
  // Create invite
  var newGuest = new Guest();

  // Set the information needed
  // newGuest.name = req.body.name;
  newGuest.email = req.body.email;
  // newGuest.whatismusement = req.body.whatismusement;

  console.log(newGuest.email);

  newGuest.save(function(error, guest) {
    if (error)
      console.log("Error when creating a new guest. Please verify this.");
    else {
      //Moment id if success
      console.log(guest.id);
    }
  });
}
module.exports = {
  insertInvite: insertInvite
}
