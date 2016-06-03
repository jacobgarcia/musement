var Guest = require("models/guest.js");
// var newEmail = require('config/sendEmail.js');
const sendgrid  = require('sendgrid')('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');


var insertInvite = function(req) {
  // Create invite
  var newGuest = new Guest();

  // Set the information needed
  // newGuest.name = req.body.name;
  newGuest.email = req.body.email;
  // newGuest.whatismusement = req.body.whatismusement;

  var email = new sendgrid.Email();
  email.addTo(newGuest.email);
  email.subject = "¡Bienvenido a Musement!";
  email.from = 'hello@musement.co';
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
  sendgrid.send(email, function(err, json) {
    if (err) { console.error(err); }
    console.log(json);
  });

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
