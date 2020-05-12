document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  const p = document.createElement('h3');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  div.appendChild(p);
  mainDiv.insertBefore(div, ul);
  const lis = ul.children;
 
  function removeConfirmation(li) {
    const l = li.querySelector('label');
    l.style.display = 'none';
  };

  function addConfirmation(li) {
    const l = li.querySelector('label');
    l.style.display = '';
  };

  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {

      form.querySelector('button').disabled = true;
      var counter = 0;

      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
          removeConfirmation(li);
          counter += 1;
        } else {
          li.style.display = 'none';
        }

      }

      p.innerHTML = counter + ' people confirmed';

    } else {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
        addConfirmation(li);
        form.querySelector('button').disabled = false;

      }
      p.innerHTML = '';

    }

  });

  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirm')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    

    return li;
  }

  function isDuplicate(names, targetName) {
    let flag = false;

    for (let i = 0; i < names.length; i += 1) {
      const name = names[i].firstElementChild.textContent;
      if (targetName === name) {
        flag = true;
      };
    }

    return flag;
  };


  form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (input.value !== '') {

      const isDup = isDuplicate(lis, input.value);

      if (isDup === false) {
        const text = input.value;
        input.value = '';
        const li = createLI(text);
        ul.appendChild(li);
      } else {
        alert(input.value + ' is already in the list');
      }
    } else {
      alert('Field cannot be empty')
    };

  });

  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    const label = checkbox.parentNode;

    if (checked) {
      listItem.className = 'responded';
      label.childNodes[0].textContent = 'Confirmed';
    } else {
      label.childNodes[0].textContent = 'Confirm';
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;


      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };

      // select and run action in button's name
      nameActions[action]();

    }
  });
});