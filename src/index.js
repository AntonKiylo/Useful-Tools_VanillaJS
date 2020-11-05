import './style.css'
import Tabs from './components/tab/Tabs';
import Calculator from './components/calculator/Calculator'
import TimeAndDate from './components/date/Date'
import Timer from './components/timer/Timer'
import Weather from './components/weather/Weather'
import DarkMode from './components/dark-mode/DarkMode'

const components = {
  'tabs': new Tabs,
  'calculator': new Calculator,
  'date': new TimeAndDate,
  'timer': new Timer,
  'weather': new Weather,
  'darkMode': new DarkMode,
}

for (let key in components) {
  components[key].init()
}