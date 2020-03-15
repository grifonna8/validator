'use strict';


class Validator{
  constructor({selector, pattern = {}, method}){
    this.form = document.querySelector(selector);
    this.pattern = pattern; /* шаблоны, которые мы сможем добавлять, не трогая код валидатора */
    this.method = method; /* какие конкретные поля должнв валидироваться и какие свойства должны к ним применяться */
    this.elemForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' &&
      item.type !== 'button';
    });
    this.error = new Set();
  }

  isValid(elem){
    const validatorMethod = {
      notEmpty(elem) {
        if(elem.value.trim() === ''){
          return false;
        }
        return true;
      },
      pattern(elem, pattern){
        return pattern.test(elem.value)
      }
    };

    if(this.method){
      const method = this.method[elem.id];

      if(method){
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимое передать id полей ввода и метод проверки этих полей');
    }
     
    return true;
  }
  checkIt(event){
    const target = event.target;
    if (this.isValid(target)){
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
    console.log(this.error);
  }
  
  init(){
    this.applyStyle();
    this.setPattern();
    this.elemForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.elemForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size){
        e.preventDefault();
      }
    });
  }

  showError(elem){
    elem.classList.remove('success');
    elem.classList.add('error');
    if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem){
    elem.classList.remove('error');
    elem.classList.add('success');
    if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
      elem.nextElementSibling.remove();
    }
  }

  applyStyle(){
    const style = document.createElement('style');
    style.textContent = `
    input.success {
      border: 2px solid green;
    }
    input.error {
      border: 2px solid red;
    }
    .validator-error {
      font-size: 12px;
      font-family: sans-serif;
      color: red;
    }`
    document.head.appendChild(style);
  }
  setPattern(){
    if(!this.pattern.phone){
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if(!this.pattern.email){
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}
