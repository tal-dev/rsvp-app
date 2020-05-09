const form = document.querySelector('#registrar');
const inputeInvite = form.querySelector('input');
const submitInvite = form.querySelector('button');
const ul = document.querySelector('#invitedList');
const ulList = ul.children;

const mainDiv = document.querySelector('.main');
const div = document.createElement('div');
const label  = document.createElement('label');
label.textContent = "Hide those who haven't responded";
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
label.appendChild(checkbox);
div.appendChild(label);
mainDiv.insertBefore(div, ul);

checkbox.addEventListener('change', (e) => {

    const isChecked = e.target.checked;

    if(isChecked) {
        for(let i = 0; i < ulList.length; i+=1) {
            if(ulList[i].className === 'responded') {
                ulList[i].style.display = '';
            }   
            else {
                ulList[i].style.display = 'none';
            }  
        }
    }
    else {
        for(let i = 0; i < ulList.length; i+=1) {
            if(ulList[i].className === '') {
                ulList[i].style.display = '';
            }  
    }

}});



form.addEventListener('submit', (e) => {
   
    e.preventDefault();
    const text = inputeInvite.value;
    const li = createLI(text);
    ul.appendChild(li);
    inputeInvite.value = '';

});

function createLI(text) {

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);

    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'edit';
    li.appendChild(buttonEdit);

    const buttonRemove = document.createElement('button');
    buttonRemove.textContent = 'remove';
    li.appendChild(buttonRemove);

    ul.appendChild(li);
    return li;
};

ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;

        if(button.textContent === 'remove') {
            ul.removeChild(li);
        }
        else if(button.textContent === 'edit') {

            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'save';
        }
        else if(button.textContent === 'save') {
            const input = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textContent = 'edit';
        }
    }
});

ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;

    if(checked) {
        checkbox.parentNode.parentNode.className = 'responded';
    }
    else {
        checkbox.parentNode.parentNode.className = '';
    }
});






