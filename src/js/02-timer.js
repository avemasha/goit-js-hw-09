import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  clockFace: document.querySelector('.timer'),
  dayValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', 'disabled');




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      chosenDateMs = selectedDates[0].getTime();

     if(chosenDateMs < new Date()){
      Notify.failure('Please choose a date in the future.')
      return;
     }

   refs.startBtn.disabled = false;

  }
};



flatpickr('#datetime-picker', options);


let object = {};

const timerOn = () => {
  intervalId = setInterval(() => {
    
    const deltaTime = chosenDateMs - new Date().getTime();
    if (deltaTime < 0 ){
      clearTimeout(intervalId);
      Notify.failure('You ran out oof time!')
      return;
    };
    object = convertMs(deltaTime)
    updateClockFace(object);
  },1000)
}



  

   

   

     function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      // Remaining days
      const days = addLeadingZero(Math.floor(ms / day));
      // Remaining hours
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
      return { days, hours, minutes, seconds };
    }
    
   

 
   
   function updateClockFace({ days, hours, minutes, seconds }) {
    refs.dayValue.textContent = `${days}`;
    refs.hoursValue.textContent = `${hours}`;
    refs.minutesValue.textContent = `${minutes}`;
    refs.secondsValue.textContent = `${seconds}`;
  }






 function addLeadingZero(value) {
  return String(value).padStart( 2, '0');
}




refs.startBtn.addEventListener('click', timerOn);