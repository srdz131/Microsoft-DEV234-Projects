var displayTime = document.getElementById('timer');
var displayMili = document.getElementById('miliseconds');
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var timerecord = document.getElementById('timerecord');
var pause = document.getElementById('pause');
var rank = document.getElementById('times');

var seconds = '00';
var minutes = '00';
var miliseconds = '00';

var x = 0;

var interval;
var current;



var ticker = function ticker() {
    miliseconds++;
    if (miliseconds >= 100) {
        seconds++;
        miliseconds = 0;
        if (seconds >= 60) {
            minutes++
            seconds = '0' + 0;
            if (minutes < 10) {
                minutes = '0' + minutes;

            }

        }
    }


    displayTime.innerHTML = minutes + ":" + seconds;
    displayMili.innerHTML = ':' + miliseconds;

}
/////////////////////////////////////////////////////////starter
var starter = function starter() {

    //toggle start
    if (start.value === "0") {
        interval = setInterval(ticker, 10);
        start.value = 1;
        console.log(start.value)
    } //toggle pause
    else if (start.value === "1") {
        clearInterval(interval);
        start.value = 0;
        console.log(start.value)
    }
}
/////////////////////////////////////////////////////////end of starter



/////////////////////////////////////////////////////////reseter
var reseter = function reseter() {


    clearInterval(interval);
    start.value = 0; // reset toggle to default
    minutes = '00';
    seconds = '00';
    miliseconds = '00';
    displayTime.innerHTML = minutes + ":" + seconds;
    displayMili.innerHTML = ':' + miliseconds;
    rank.innerHTML = "<h3>Past Times</h3>";


}
/////////////////////////////////////////////////////////end of reseter

/////////////////////////////////////////////////////////timelog
var timelog = function timelog() {


    current = minutes + ":" + seconds + ":" + miliseconds;
    var arr = [];

    function add() {

        arr[x] = current;
        console.log("element " + arr[x] + ' has been added on position ' + x); //for test
        rank.innerHTML += '<li>' + arr[x] + '</li>' + '<br />';
        x++;
    }

    add();
}
/////////////////////////////////////////////////////////end of timelog

/////////////////////////////////////////////////////////events and for loop
var eventList = ['click', 'keypress'];

for (event of eventList) {
    //time recording function
    timerecord.addEventListener(event, timelog);
    start.addEventListener(event, starter);
    reset.addEventListener(event, reseter)
    var functionList = [starter, reseter, timelog];

    window.addEventListener(event, function() {
        if (event.keyCode == 116) {
            return timelog();
        } else if (event.keyCode == 115) {
            return starter();
        } else if (event.keyCode == 114) {
            return reseter();
        }
    })


};
/////////////////////////////////////////////////////////end of events and for loop
