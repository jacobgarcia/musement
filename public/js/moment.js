// Animation moment
var click = true;
$('#moment').click(function(){
  if (! click) {
    $('#moment').removeClass('loading').addClass('loading-click');
    click = true;
  }else{
    $('#moment').removeClass('loading-click').addClass('loading');
    click = false;
  }

  console.log("Click");
});

// Moment timer
var Stopwatch = function (elem, options) {

    var timer = createTimer(),
        startButton = createButton("start", start),
        stopButton = createButton("stop", start),
        resetButton = createButton("reset", reset),
        offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append elements
    elem.appendChild(startButton);

    // initialize
    reset();

    // private functions
    function createTimer() {
        return document.createElement("span");
    }

    function createButton(action, handler) {
        var a = document.createElement("a");
        a.className = "open btn btn-big";
        a.href = "#" + action;
        a.innerHTML = action;
        a.addEventListener("click", function (event) {
            handler();
            event.preventDefault();
        });
        return a;
    }

    function start() {
        if (!interval) {
            offset = Date.now();
            interval = setInterval(update, options.delay);

        } else {
            stop();
            firstTime = false;
            totalTime = Math.floor((Math.ceil(clock / 1000)) / 60); /* Return minutes; consider the floor function */
            document.getElementById('time').value = totalTime;
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function reset() {
        clock = 0;
        render(0);
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        timer.innerHTML = clock / 1000;
    }

    function delta() {
        var now = Date.now(),
            d = now - offset;

        offset = now;
        return d;
    }

    function getClock() {
        return clock;
    }

    // public API
    this.start = start;
    this.stop = stop;
    this.reset = reset;
};


// basic examples
var elems = document.getElementById('test');

var firstTime = true;

var watch = new Stopwatch(elems);

var totalTime = 0;

var fileName = "";


// programmatic examples
var a = document.getElementById("a-timer");
aTimer = new Stopwatch(a);
aTimer.start();

var b = document.getElementById("b-timer");
bTimer = new Stopwatch(b, {
    delay: 100
});
bTimer.start();

var c = document.getElementById("c-timer");
cTimer = new Stopwatch(c, {
    delay: 456
});
cTimer.start();

var d = document.getElementById("d-timer");
dTimer = new Stopwatch(d, {
    delay: 1000
});
dTimer.start();

/////////////// REMEMBER TO CHANGE NAME
function alertFilename() {
    var thefile = document.getElementById('attachement');
    var files = (thefile.value).split("\\"); /* Using regular expressions to split the fake PATH */
    fileName = files[2];
}
