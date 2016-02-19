var Moment = require("models/moment.js");
var User = require("models/user.js");

var insertMoment = function (req, user) {
    // Create moment
    var newMoment = new Moment();

    // Set the information needed
    newMoment.description = req.body.description;
    newMoment.timelapse = req.body.totalTime;
    newMoment.attachement.reference = req.body.fileName;

    console.log(newMoment.description + ' ' + newMoment.timelapse + ' ' + newMoment.attachement.reference + ' ' + req.user.id);

    newMoment.save(function (error, moment) {
        console.log(moment.id);
        User.update({
                id: req.user.id
            }, {
                $push: {
                    moment: moment.id
                }
            }, {
                upsert: true
            },
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added");
                }
            });
    });
}

module.exports = {
    insertMoment: insertMoment
}
