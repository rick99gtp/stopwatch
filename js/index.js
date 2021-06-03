// progress line
const milli_line = document.querySelector('.milli-line');
const seconds_line = document.querySelector('.seconds-line');
const minutes_line = document.querySelector('.minutes-line');
const hours_line = document.querySelector('.hours-line');

// timer
const p_timer = document.querySelector('#timer');

const start_time = '00:00:00';

let hours = 0;
let minutes = 0;
let seconds = 0;
let milli = 0;

let current_time = 0;
let line_pct = 0;

let interval_id;

let timer_started = false;

const btn_start = document.querySelector('.btn-start');
const btn_stop = document.querySelector('.btn-stop');
const btn_reset = document.querySelector('.btn-reset');

updateTime(start_time);
updateLine(line_pct);

function updateTime(new_time) {
    p_timer.innerHTML = new_time;
    updateLine();
}

function updateLine() {
    milli_line.style.width = milli + "%";
    seconds_line.style.width = (seconds * 1.67) + "%";
    minutes_line.style.width = minutes + "%";
    hours_line.style.width = hours + "%";
}

btn_start.addEventListener('click', function() {

    let new_time = '';

    // disable button css
    this.classList.add('disabled');
    btn_stop.classList.remove('disabled');
    
    interval_id = setInterval(function() {
        milli++;

        if(milli >= 100) {
            milli = milli - 100;
            seconds++;

            if(seconds >= 60) {
                seconds = 0;
                minutes++;

                if(minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }

        let new_time = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + ":" + ("0" + milli).slice(-2);

        updateTime(new_time);
    }, 10);
});

btn_stop.addEventListener('click', function() {
    clearInterval(interval_id);
    this.classList.add('disabled');
    btn_start.classList.remove('disabled');
    btn_reset.classList.remove('disabled');
});

btn_reset.addEventListener('click', function() {
    milli = seconds = minutes = hours = 0;
    updateTime(start_time);
    this.classList.add('disabled');
});
