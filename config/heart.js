var Moment = require("models/moment.js");

var heartMoment = function(req){
  return Moment.find();
}

module.exports = {heartMoment:heartMoment}
