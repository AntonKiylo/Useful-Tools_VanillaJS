import './Date.css'

export default class myDate {

  timeValue = document.querySelector('.date__time-value');
  dateValue = document.querySelector('.date__date-value');

  setDate() {
    const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'];
    const monthesList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let now = new Date;
    let day = now.getDay();
    let date = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    this.timeValue.innerHTML = `${hours} : ${minutes} : ${seconds}`
    this.dateValue.innerHTML = `${daysList[day]}, ${monthesList[month]} ${date}, ${year}`

    setTimeout(this.setDate.bind(this), 1000)
  }

}