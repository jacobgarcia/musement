var Moment = require("models/moment.js");
var ObjectId = require('mongodb').ObjectID;

var populate = function(query){
    /* The populate first parameter refers to the 'foreign key', the other 2 params are the only fields that will be populated */
    console.log(query);
    return Moment.find(query).populate('user', 'username image').lean().sort({$natural:-1}).limit(30);
}

module.exports = {populate: populate};
