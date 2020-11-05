import './Timer.css'
import sound from '../../assets/alarm-ringtone.mp3'
import image from '../../assets/timer-image.png'

export default class Timer {

  timerStartButton = document.querySelector('.timer__start-button');
  timerResetButton = document.querySelector('.timer__reset-button');
  timerSetButton = document.querySelector('.timer__set-button');
  timerModal = document.querySelector('.timer-modal');
  timerModalInputs = document.querySelectorAll('.timer-modal__content input');
  timerModalHoursInput = document.querySelector('.timer-modal__hours-input');
  timerModalMinutesInput = document.querySelector('.timer-modal__minutes-input');
  timerModalSecondsInput = document.querySelector('.timer-modal__seconds-input');
  timerModalCancelButton = document.querySelector('.timer-modal__cancel-button');
  timerModalSetButton = document.querySelector('.timer-modal__form');
  timerValue = document.querySelector('.timer__value');
  endTimerModal = document.querySelector('.end-timer-modal');
  endTimerModalStop = document.querySelector('.end-timer-modal__stop-button');
  endTimerModalImage = document.querySelector('.end-timer-modal__content > img')
  alarmSound = document.querySelector('audio');

  hours = 0;
  minutes = 0;
  seconds = 0;
  timeEndMs;
  leftMs;
  timerId;
  isTimerStartButton = false;

  /************************/

  clearInputValue() {
    this.timerModalInputs.forEach(input => input.value = '');
  }

  setTimer(timeEndMs) {
    this.leftMs = timeEndMs - Date.now();
    const leftSec = Math.round(this.leftMs / 1000);
    let hour = Math.floor(leftSec / 3600);
    let minute = Math.floor(leftSec / 60) - (hour * 60);
    let second = leftSec % 60;

    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }

    if (leftSec < 0) {
      const alarmDelay = 15000;

      this.isTimerStartButton = !this.isTimerStartButton

      this.showEndTimerModal();

      this.resetTimer();

      setTimeout(() => this.hideEndTimerModal(), alarmDelay)

      return;
    }

    this.timerValue.innerHTML = `${hour} : ${minute} : ${second}`
  }

  resetTimer() {
    clearInterval(this.timerId);
    this.timerValue.innerHTML = '00 : 00 : 00';
    this.timerStartButton.disabled = true;
    this.timerStartButton.innerHTML = 'START';
    this.timerResetButton.disabled = false;
    this.timerSetButton.disabled = false;
  }

  showTimerModal() {
    this.timerModal.style.display = 'block';
  }

  hideTimerModal() {
    this.timerModal.style.display = 'none';
    this.clearInputValue();
  }

  showEndTimerModal() {
    this.endTimerModalImage.src = image;
    this.endTimerModal.style.display = 'block';
    this.alarmSound.src = sound
    this.alarmSound.currentTime = 0;
    this.alarmSound.play();
  }

  hideEndTimerModal() {
    this.endTimerModal.style.display = 'none';
    this.alarmSound.pause();
    this.alarmSound.currentTime = 0;
  }

  init() {

    this.timerStartButton.addEventListener('click', () => {
      this.isTimerStartButton = !this.isTimerStartButton;

      if (this.isTimerStartButton) {
        this.timerStartButton.innerHTML = 'PAUSE';
        this.timerResetButton.disabled = true;
        this.timeEndMs = this.leftMs + Date.now();
        this.timerSetButton.disabled = true;
        this.timerId = setInterval(() => {
          this.setTimer(this.timeEndMs);
        }, 1000)
      } else {
        this.timerStartButton.innerHTML = 'START';
        this.timerSetButton.disabled = false;
        this.timerResetButton.disabled = false;
        clearInterval(this.timerId);
      }
    })

    this.timerResetButton.addEventListener('click', () => {
      this.resetTimer();
    })

    this.timerSetButton.addEventListener('click', () => {
      this.showTimerModal();
    })

    this.timerModal.addEventListener('click', (event) => {
      if (event.target === this.timerModal || event.target === this.timerModalCancelButton) {
        this.hideTimerModal();
      }
    })

    this.timerModalSetButton.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.timerModalHoursInput.value || this.timerModalMinutesInput.value || this.timerModalSecondsInput.value) {
        const presentTimeMs = Date.now();

        this.hours = this.timerModalHoursInput.value * 3600000;
        this.minutes = this.timerModalMinutesInput.value * 60000;
        this.seconds = this.timerModalSecondsInput.value * 1000;

        this.timeEndMs = presentTimeMs + (this.hours + this.minutes + this.seconds);

        this.timerStartButton.disabled = false;

        this.setTimer(this.timeEndMs);
      }

      this.hideTimerModal();
    })

    this.endTimerModalStop.addEventListener('click', () => {
      this.hideEndTimerModal();
    })

  }

}