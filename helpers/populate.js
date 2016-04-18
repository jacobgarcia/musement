var Moment = require("models/moment.js");


var populate = function(query){
    /* The populate first parameter refers to the 'foreign key', the other 2 params are the only fields that will be populated */
    return Moment.find(query).populate('user', 'username image').lean().sort({"_id":1, $natural:-1}).limit(30);
}

module.exports = {populate: populate};
