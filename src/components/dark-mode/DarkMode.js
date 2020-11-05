import './DarkMode.css'

export default class DarkMode {
  checkBox = document.getElementById('myonoffswitch')
  body = document.body

  init() {
    this.checkBox.addEventListener('click', () => {
      if(this.checkBox.checked){
        this.body.classList.add('active-dark-mode')
      } else {
        this.body.classList.remove('active-dark-mode')
      }
    })
  }

}