let timerId;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);

function onStartClick() {
  timerId = setInterval(bgcololChange, 1000);
  btnStart.disabled = true;
}

function bgcololChange() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStopClick() {
  clearTimeout(timerId);
  btnStart.disabled = false;
}
