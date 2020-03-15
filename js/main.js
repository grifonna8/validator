'use strict';

// const myForm = document.getElementById('myform');

// const elemForms = [];
// for (const elem of myForm.elements){
//   if(elem.tagName.toLowerCase() !== 'button' &&
//   elem.type !== 'button'){
//     elemForms.push(elem);
//   }
// }
// const valid = (event) => {
//   elemForms.forEach(elem => {
//     if (!elem.value){
//       elem.style.border = 'solid red';
//       event.preventDefault();
//     } else {
//       elem.style.border = '';
//     }
//   })
// }

// myForm.addEventListener('submit', valid);

const valid = new Validator({
  selector: '#myform',
  pattern: {
    phone: /^\+380\d{7}$/
  },
  method: {
    'phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'email': [
      ['notEmpty'],
      ['pattern', 'email']
    ]
  },
});

valid.init();
