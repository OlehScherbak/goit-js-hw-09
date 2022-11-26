import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeCheck(selectedDates);
  },
  onReady(selectedDates) {
    pickedDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

const btn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

function timeCheck(selectedDates) {
  if (selectedDates[0] <= new Date()) {
    btn.disabled = 'true';
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    btn.removeAttribute('disabled');
    pickedDate = selectedDates[0];
  }
}

btn.addEventListener('click', onStartClick);

function onStartClick() {
  calcRemainTime();
  timerId = setInterval(calcRemainTime, 1000);
}

function calcRemainTime() {
  if (pickedDate < new Date()) {
    clearTimeout(timerId);
    return;
  }

  remainTime = convertMs(pickedDate - new Date());

  days.textContent = addLeadingZero(remainTime.days.toString());
  hours.textContent = addLeadingZero(remainTime.hours.toString());
  minutes.textContent = addLeadingZero(remainTime.minutes.toString());
  seconds.textContent = addLeadingZero(remainTime.seconds.toString());
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
