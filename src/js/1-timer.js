import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const input = document.querySelector("#datetime-picker")
const button = document.querySelector("button");
button.disabled = true;
const daysValue = document.querySelector(".value[data-days]")
const hoursValue = document.querySelector(".value[data-hours]")
const minutesValue = document.querySelector(".value[data-minutes]")
const secondsValue = document.querySelector(".value[data-seconds]")


    

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates.length > 0) {
            userSelectedDate = selectedDates[0];
            const currentDate = Date.now();
            if (userSelectedDate <= currentDate) {
                iziToast.error({
                    message: "❌ Please choose a date in the future",
                    position: 'topRight',
                });
                button.disabled = true;

            }
            else {
                button.disabled = false;
                
            }
        }
  },
};

flatpickr(`input[type="text"]`, options);

button.addEventListener("click", start);
function start() {
    button.disabled = true;
    input.disabled = true;
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timer = userSelectedDate.getTime() - currentTime;
        const time = convertMs(timer)
        if (timer <= 0) {
            clearInterval(intervalId);
            onTick({ days: "00", hours: "00", minutes: "00", seconds: "00" });
            input.disabled = false;
            return;
        }
        console.log(time);
        onTick(time);
    }, 1000);
    
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return {days, hours, minutes, seconds};
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function onTick({ days, hours, minutes, seconds }) {
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
}