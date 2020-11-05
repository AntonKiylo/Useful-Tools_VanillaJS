import './Tabs.css';

export default class Tabs {
  
  tabBlock = document.querySelector('.tab');
  tabLinks = document.querySelectorAll('.tab__link');
  tabContentBlocks = document.querySelectorAll('.tab__content');

  openTab(event, tabId){
    let tabLink = event.target;
    let tabContentBlock = document.querySelector(`${tabId}`);
  
    this.tabContentBlocks.forEach(block => {
      block.className = block.className.replace(' tab__content_active', '');
    })
  
    this.tabLinks.forEach(link => {
      link.className = link.className.replace(' tab__link_active', '');
    })
  
    tabLink.className += ' tab__link_active';
    tabContentBlock.className += ' tab__content_active';
  }

  onClick(){
    this.tabBlock.addEventListener('click', event => {
      if (event.target.className === 'tab__link') {
        event.target.addEventListener('click', this.openTab(event, event.target.getAttribute('href')))
      }
    })
  }
}