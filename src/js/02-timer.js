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
   
    console.log(selectedDates[0]);
    const chosenDate = new Date(selectedDates[0]);
    
    const utcChosenDate = chosenDate.getTime();
    const currentTime = Date.now();
    const deltaTime = utcChosenDate - currentTime;
    // console.log(utcChosenDate);

    timerOn(chosenDate);
    // timeStop(deltaTime);
    
    if (selectedDates[0] < new Date()) {
      console.log(new Date())

      Notify.failure('Please choose a date in the future');
      return;
    } 
   
   
  

    refs.startBtn.removeAttribute('disabled', 'disabled');
    
   const timer = {

    intervalId: null,
    isActive: false,

     start() {

      if (this.isActive) {
        return;
      }

      this.isActive = true;
   
      this.intervalId = setInterval(() => {
       const currentTime = Date.now();
       
        const deltaTime = utcChosenDate - currentTime;
        // console.log(deltaTime);
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
       const time = convertMs(deltaTime);

      function  updateClockface ({days, hours, minutes, seconds}) {
        refs.dayValue.textContent = `${days}`;
        refs.hoursValue.textContent = `${hours}`;
        refs.minutesValue.textContent = `${minutes}`;
        refs.secondsValue.textContent = `${seconds}`;
      }

      updateClockface(time);
  
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
     }, 1000)
     
   },

   stop(){
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.convertMs(0);
   }

   

   
 }
  
// function timeStop(deltaTime) {
//   if (deltaTime < 1000) {
//     timer.stop();
    
//   }



   function timerOn (chosenDate) {
    const currentTime = Date.now();
    refs.startBtn.addEventListener('click', () => {
       timer.start();
     });
   }
}
};

flatpickr('#datetime-picker', options);










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

 function addLeadingZero(value) {
  return String(value).padStart( 2, '0');
}




