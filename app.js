const form = document.querySelector('#registrar');
const input = form.querySelector('input');

 form.addEventListener('submit', (e) => {
     e.preventDefault();
     const text = input.value;
     const ul = document.querySelector('#invitedList');
     const li = document.createElement('li');
     ul.appendChild(li);
     li.textContent = text;
     input.value = '';
 });

  










