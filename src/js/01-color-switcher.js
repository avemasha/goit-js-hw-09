function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  let colorId = null;

const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
  };

  refs.stopBtn.disabled = true;

  refs.startBtn.addEventListener('click',
   () => {
    onBtnDisabled()
    colorId = setInterval(() => {
      const color = getRandomHexColor();
      refs.body.style.backgroundColor = `${color}`;
    }, 1000);
  });
  
  refs.stopBtn.addEventListener('click', () => {
    clearInterval(colorId);
    onBtnDisabled();
    
  });

  function onBtnDisabled () {
    if (!refs.startBtn.disabled) {
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = false
    } else {
      refs.startBtn.disabled = false;
      refs.stopBtn.disabled = true;
    }
  }




