var Moment = require("models/moment.js");
var ObjectId = require('mongodb').ObjectID;

var heartMoment = function(req){
  var condition = {"_id":req.params.id}, update = {$inc: {heart: 1}}, options = {multi: true};
  Moment.update(condition, update, options, callback);

  function callback(err, rowsAffected){
    Moment.update({"_id":ObjectId(req.params.id)}, {$push: {usersHeart: req.user.id}}, function(err){
      if(err)
        console.log(err);
    });
  };
}

module.exports = {heartMoment:heartMoment}
