var Moment = require("models/moment.js");

var heartMoment = function(id){
  var condition = {"_id":id}, update = {$inc: {heart: 1}}, options = {multi: true};
  Moment.update(condition, update, options, callback);

  function callback(err, rowsAffected){
    if(err)
      console.log("Error at updating heart");
  };
}

module.exports = {heartMoment:heartMoment}
