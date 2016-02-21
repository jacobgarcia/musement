var Moment = require("models/moment.js");
var User = require("models/user.js");

var load = function(req, res) {
  Moment.find().lean().exec(function(err, moments) {
    return res.end(JSON.stringify(moments));
  });
}
