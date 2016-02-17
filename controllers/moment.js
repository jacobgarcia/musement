var Stopwatch = require("node-stopwatch").Stopwatch;

var stopwatch = Stopwatch.create();

var start = function(){
    stopwatch.start();
    console.log("Clock started");
}

module.exports = {
    start: start
};
