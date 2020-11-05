import './style.css'
import Tabs from './components/tab/Tabs';
import Calculator from './components/calculator/Calculator'
import TimeAndDate from './components/date/Date'
import Timer from './components/timer/Timer'
import Weather from './components/weather/Weather'

const tabs = new Tabs;
const calc = new Calculator;
const date = new TimeAndDate
const timer = new Timer
const weather = new Weather

tabs.onClick();
calc.run()
date.setDate()
timer.init()
weather.init()