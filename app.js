const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');
const saveButton = document.createElement('button');
saveButton.className = 'save';

function createLI(text) {

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);
    ul.appendChild(li);

    let label = document.createElement('label');
    label.textContent = 'Confirmed';
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);

    let editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'edit';
    li.appendChild(editButton);

    let removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.textContent = 'remove';
    li.appendChild(removeButton);

    return li;
};

form.addEventListener('submit', (e) => {

    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
});

ul.addEventListener('change', (e) => {
    let checkbox = e.target;
    let checked = checkbox.checked;
    let listItem = checkbox.parentNode.parentNode;

    if (checked) {
        listItem.className = 'responded';
    } else {
        listItem.className = '';
    }
});

ul.addEventListener('click', (e) => {

    if (e.target.tagName === 'BUTTON') {

        const targetButton = e.target;
        const li = targetButton.parentNode;
        const ul = targetButton.parentNode.parentNode;
        const span = li.firstElementChild;
        const input = document.createElement('input');


        if (e.target.className === 'remove') {
            ul.removeChild(liItem);
        } else if (e.target.className === 'edit') {
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);

            saveButton.className = 'save';
            saveButton.textContent = 'save';
            li.insertBefore(saveButton, targetButton);
            li.removeChild(targetButton);        
        }
        else if(e.target.className === 'save') {
            li.insertBefore(span, input);
            span.textContent = input.value;
        }
    }
});
