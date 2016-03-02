var User = require("models/user.js");
var ObjectId = require('mongodb').ObjectID;

var setPicture = function(req){
  User.where({"_id":ObjectId(req.user.id)}).update({$set: {image:req.file.path}}).exec(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully added");
    }
  });
}

module.exports = {setPicture: setPicture};
