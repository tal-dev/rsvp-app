const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

 form.addEventListener('submit', (e) => {

     e.preventDefault();
     const text = input.value;
     input.value = '';

     const li = document.createElement('li');
     ul.appendChild(li);
     li.textContent = text;

     let label = document.createElement('label');
     label.textContent = 'Confirmed';
     let checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     label.appendChild(checkbox);
     li.appendChild(label);

     let removeButton = document.createElement('button');
     removeButton.textContent = 'remove';
     label.appendChild(removeButton);

     ul.appendChild(li);
 });

 ul.addEventListener('change', (e) => {
     let checkbox = e.target;
     let checked = checkbox.checked;
     let listItem = checkbox.parentNode.parentNode;

     if(checked) {
        listItem.className = 'responded';
     }
     else {
         listItem.className = '';
     }
 });
  










