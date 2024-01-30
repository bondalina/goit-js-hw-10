// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import icon from '../img/close-error.svg'

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const datetimePicker = document.getElementById('datetime-picker');

let countdownInterval;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        // title: 'Error',
        message: 'Please choose a date in the future',
        position: "topRight",
        iconUrl: icon,
        titleColor: 'white',
        messageColor: 'white',
        timeout: false,
        backgroundColor: '#EF4040',

      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr("#datetime-picker", options);

function startCountdown() {
  startButton.disabled = true;

  const targetDate = userSelectedDate.getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      startButton.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', startCountdown);

// Функція для перевірки початкового стану кнопки Start
function checkStartButtonState() {
  startButton.disabled = true;
}

// Виклик функції для перевірки початкового стану кнопки Start
checkStartButtonState();


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


