import './Weather.css'

export default class Weather {
  weatherTab = document.getElementById('tab-link-4')
  weatherBlock = document.querySelector('.weather-block')
  weatherBlockTitle = document.querySelector('.weather-block__temperature')
  weatherBlockState = document.querySelector('.weather-block__state')
  weatherBlockWind = document.querySelector('.weather-block__wind')
  loader = document.querySelector('.lds-spinner')

  getCoordinates() {
    if (!navigator.geolocation) {
      this.weatherBlock.innerHTML = 'Geolocation is not supported by your browser';
    } else {
      this.loader.classList.remove('inactive')
      navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));
    }
  }

  success(position) {
    const apiURL = 'https://api.openweathermap.org/data/2.5'
    const apiKey = "00bfb1934a8e8968b9f6660249c58bce"
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const apiQuery = `${apiURL}/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${apiKey}`

    fetch(apiQuery)
      .then(response => response.json())
      .then(data => this.drawWeather(data))
      .catch(error => console.error(error))
  }

  error() {
    this.weatherTab.innerHTML = 'Please accept location request'
  }

  drawWeather(data) {
    this.loader.classList.add('inactive')
    this.weatherBlockTitle.innerHTML = `${data.main.temp} °C <p style="font-size: 20px">feels like ${Math.round(data.main.feels_like)} °C</p> <img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
    this.weatherBlockState.innerHTML = `${data.weather[0]["description"][0].toUpperCase()}${data.weather[0]["description"].slice(1)}`
    this.weatherBlockWind.innerHTML = `Wind ${data.wind.speed} km/h`
    this.weatherBlock.classList.remove('inactive')
  }

  init() {
    this.getCoordinates()
  }
}