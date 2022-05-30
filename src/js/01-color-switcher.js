
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stopBtnHandler);

let timerId = null;
let disablet = false;

function startBtnHandler() {
    if (disablet) {
        return
    };
    disablet = true;
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
};

function stopBtnHandler() {
    clearInterval(timerId);
    disablet = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};