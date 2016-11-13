var Guest = require("../models/guest.js");
const sendgrid  = require('sendgrid')('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');

var insertInvite = function(req, callback) {
  // Create invite
  console.dir(req.body);
  var newGuest = new Guest();

  // Set the information needed
  newGuest.email = req.body.email;
  newGuest.name = req.body.name;
  newGuest.preference = req.body.preference;

  var email = new sendgrid.Email();
  email.addTo(newGuest.email);
  email.subject = "Invitation Request";
  email.from = 'hello@musement.co';
  email.fromname = "Wetopia";
  email.text = 'Welcome to Wetopia';
  email.html = '<h1>Welcome to Wetopia</h1>';

  // or set a filter using an object literal.
  email.setFilters({
      'templates': {
          'settings': {
              'enable': 1,
              'template_id' : '767734fc-b221-47b2-96d7-344ab5179bf4',
          }
      }
  });

  newGuest.save(function(error, guest) {
    var response = {};
    if (error){
      response.message = "Error";
      response.error = error;
      response.success = false;
      console.dir(error);
    } else {
      response.success = true;
      //Moment id if success
      console.log(guest.id);
      sendgrid.send(email, function(err, json) {
        if (err) { console.error(err); }
      });
    }
    console.dir(response);
    callback(response);
  });
}

module.exports = {
  insertInvite: insertInvite
}
