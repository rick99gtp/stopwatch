// progress line
const milli_line = document.querySelector('.milli-line');
const seconds_line = document.querySelector('.seconds-line');
const minutes_line = document.querySelector('.minutes-line');
const hours_line = document.querySelector('.hours-line');

// timer
const p_timer = document.querySelector('#timer');

// initialize timer
const start_time = '00:00:00';

// set time variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let milli = 0;

// ID for clearInterval
let interval_id;

// DOM button elements
const btn_start = document.querySelector('.btn-start');
const btn_stop = document.querySelector('.btn-stop');
const btn_reset = document.querySelector('.btn-reset');

// display the start time of 00:00:00
updateTime(start_time);

function updateTime(new_time) {
    // display the time
    p_timer.innerHTML = new_time;

    // update the line
    updateLine();
}

function updateLine() {
    // adjust widths of each time element
    milli_line.style.width = milli + "%";
    seconds_line.style.width = (seconds * 1.67) + "%";
    minutes_line.style.width = minutes + "%";
    hours_line.style.width = hours + "%";
}

btn_start.addEventListener('click', function() {
    // disable start button
    this.classList.add('disabled');

    // enable stop button
    btn_stop.classList.remove('disabled');

    // get id of setInterval and execute the function
    interval_id = setInterval(function() {
        milli++;

        if(milli >= 100) {
            // increment seconds
            milli = milli - 100;
            seconds++;

            if(seconds >= 60) {
                // reset seconds
                seconds = 0;

                // increment minutes
                minutes++;

                if(minutes >= 60) {

                    // reset minutes
                    minutes = 0;

                    // increment hours
                    hours++;
                }
            }
        }

        // set total time
        let new_time = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + ":" + ("0" + milli).slice(-2);

        // display the new time
        updateTime(new_time);
    }, 10);
});

btn_stop.addEventListener('click', function() {
    clearInterval(interval_id);
    // disable stop button
    this.classList.add('disabled');

    // enable start button
    btn_start.classList.remove('disabled');

    // disable reset button
    btn_reset.classList.remove('disabled');
});

btn_reset.addEventListener('click', function() {
    // reset variables
    milli = seconds = minutes = hours = 0;

    // reset time to 00:00:00
    updateTime(start_time);

    // disable reset button
    this.classList.add('disabled');
});
