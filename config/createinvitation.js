var Guest = require("models/guest.js");
// var newEmail = require('config/sendEmail.js');
const sendgrid  = require('sendgrid')('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');

var insertInvite = function(req, callback) {
  // Create invite
  console.dir(req.body);
  var newGuest = new Guest();

  // Set the information needed
  newGuest.email = req.body.email;
  console.log("Email: " + newGuest.email);
  // newGuest.whatismusement = req.body.whatismusement;

  var email = new sendgrid.Email();
  email.addTo(newGuest.email);
  email.subject = "Bienvenido a Musement :)";
  email.from = 'hello@musement.co';
  email.fromname = "Musement";
  email.text = 'Bienvenido a Musement!';
  email.html = '<h1>Bienvenido a Musement!</h1>';

  // or set a filter using an object literal.
  email.setFilters({
      'templates': {
          'settings': {
              'enable': 1,
              'template_id' : '9a114f42-5f35-4eef-87bb-144146b12645',
          }
      }
  });

  console.log(newGuest.email);

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
