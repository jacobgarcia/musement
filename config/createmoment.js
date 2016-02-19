var Moment = require("models/moment.js")

var insertMoment = function (req, user) {
    // Create moment
    var newMoment = new Moment();

    // Set the information needed
    newMoment.description = req.body.description;
    newMoment.timelapse = totalTime;
    newMoment.attachement.reference = fileName;

    console.log(newMoment.description + ' ' + newMoment.timelapse + ' ' + newMoment.attachement.reference);

    newMoment.save(function (err) {
        if (err)
            throw err;
        //return done(null, newMoment);
    });
}

module.exports = {
    insertMoment: insertMoment
}