var Guest = require("../models/guest.js");
var helper = require('sendgrid').mail;
var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

var insertInvite = function(req, callback) {
  // Create invite
  console.dir(req.body);
  var newGuest = new Guest();

  // Set the information needed
  newGuest.email = req.body.email;
  newGuest.name = req.body.name;
  newGuest.preference = req.body.preference;

  // Set email information
  var from_email = new helper.Email('hello@musement.co', 'Wetopia'); //email, fromname
  var to_email = new helper.Email(newGuest.email);
  var subject = 'Invitation Request';
  var content = new helper.Content('text/html', 'Welcome to Wetopia'); //This is literally the content; expressed in html if template is needed
  var mail = new helper.Mail(from_email, subject, to_email, content);

  // Set template id
  mail.setTemplateId('767734fc-b221-47b2-96d7-344ab5179bf4');

  // Replace user's name in template. Depends on template
  mail.personalizations[0].addSubstitution(new helper.Substitution('-name-', newGuest.name));

  // Requests to SendGrid API
  // Send mail request
  var send_request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  // Add recipient request
  var recipient_request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/contactdb/recipients',
    body: [{"email": newGuest.email, "first_name": newGuest.name, "interest": newGuest.preference}]
  });


  // Save user on db - create recipient - add it to list - send email
  newGuest.save(function(error, guest) {
    var response = {};
    if (error){
      response.message = "Error";
      response.error = error;
      response.success = false;
      console.dir(error);
    } else {
      response.success = true;
      // Create recipient
      sendgrid.API(recipient_request, function (error, response) {
        //Get recipient id
        var recipient_id = response.body.persisted_recipients[0];

        // Add to contact list
        var list_request = sendgrid.emptyRequest({
          method: 'POST',
          path: '/v3/contactdb/lists/730625/recipients/' + recipient_id,
        });

        sendgrid.API(list_request, function (error, response) {

          // Send mail
          sendgrid.API(send_request, function (error, response) {
            console.log(response.statusCode)
            console.log(response.body)
            console.log(response.headers);
          });
        });
      });
    }
    console.dir(response);
    callback(response);
  });
}

module.exports = {
  insertInvite: insertInvite
}
