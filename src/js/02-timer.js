import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', onStartBtnHandler);

startBtn.disabled = true;
let ms;
let selectedDate;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {        
        showDelta(selectedDates[0]);                     
    },
};

flatpickr(input, options);

function showDelta(date) {
    selectedDate = date.getTime();    
    const delta = selectedDate - Date.now();
    if (delta <= 0) {
        startBtn.disabled = true;
        window.alert("Please choose a date in the future");        
    }
    else {
        startBtn.disabled = false;
    };
};

function onStartBtnHandler() {
    startBtn.disabled = true;    
    const interval = setInterval(() => {
        if (ms <= 1000) {
        clearInterval(interval);
        return
    }
        timer()
    }, 1000); 
}

function timer() {
    ms = selectedDate - Date.now(); 
    let curentTime = convertMs(ms); 
    days.innerText = addLeadingZero(curentTime.days);
    hours.innerText = addLeadingZero(curentTime.hours);
    minutes.innerText = addLeadingZero(curentTime.minutes);
    seconds.innerText = addLeadingZero(curentTime.seconds);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day); 
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute); 
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

