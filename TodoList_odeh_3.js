
const adding_text = document.querySelector(".to_do_text")
const add_text_icon = document.querySelector(".add_text")
const added_text = document.querySelector("#list_input_1")
const Title_text = document.querySelector("#list_title_1")

//****** list input code ***************

let inputArray = []

function addInput(inputValue) {
  const newInput = { id: Date.now().toString(), value: inputValue, grayed_out: false };
  inputArray.push(newInput);
  localStorage.setItem('input_Array', JSON.stringify(inputArray));
  return newInput;
}

function updateInput(inputId, newValues) {
  const inputIndex = inputArray.findIndex(input => input.id === inputId);
  if (inputIndex !== -1) {
    inputArray[inputIndex] = { ...inputArray[inputIndex], ...newValues };
    localStorage.setItem('input_Array', JSON.stringify(inputArray));
  }
}

function removeInput(inputId) {
  inputArray = inputArray.filter(input => input.id !== inputId);
  localStorage.setItem('input_Array', JSON.stringify(inputArray));
}

function renderInputs() {
  const inputs = inputArray;
  adding_text.innerHTML = '';
  inputs.forEach(input => {
    const new_text = document.createElement('li');
    new_text.textContent = input.value;

    new_text.dataset.id = input.id;
    new_text.classList.toggle('grayed_out', input.grayed_out);
    adding_text.appendChild(new_text);

    const del_text = document.createElement('button');
    del_text.innerHTML = '-';
    del_text.style.backgroundColor = "red";
    del_text.style.border = "0";
    del_text.style.padding = "5px";
    del_text.style.borderRadius = "5px";

    new_text.appendChild(del_text);
    del_text.addEventListener('click', () => {
      removeInput(input.id);
      new_text.remove();
    });
  });
}

function handleTextAdd(e) {
  e.preventDefault();
  const Title_text_value = Title_text.value.trim();
  const input_value = added_text.value.trim();
  if (Title_text_value === '') return;
  localStorage.setItem('Title', Title_text_value);
  if (input_value === '') return;
  const newInput = addInput(input_value);
  const new_text = document.createElement('li');
  new_text.textContent = newInput.value;

  new_text.dataset.id = newInput.id;
  adding_text.appendChild(new_text);

  const del_text = document.createElement('button');
  del_text.innerHTML = '-';
  del_text.style.backgroundColor = "red";
  del_text.style.border = "0";
  del_text.style.padding = "5px";
  del_text.style.borderRadius = "5px";

  new_text.appendChild(del_text);
  del_text.addEventListener('click', () => {
    removeInput(newInput.id);
    new_text.remove();
  });

  added_text.value = '';
}

add_text_icon.addEventListener('click', handleTextAdd);
Title_text.addEventListener('blur', handleTextAdd);

function handleInputGrayOut(event) {
  const clickedElement = event.target;
  if (clickedElement.nodeName === 'LI') {
    clickedElement.classList.toggle('grayed_out');
    updateInput(clickedElement.dataset.id, { grayed_out: clickedElement.classList.contains('grayed_out') });
  }
}

adding_text.addEventListener('click', handleInputGrayOut);

// Load the saved items from local storage
const storageRecall = localStorage.getItem('input_Array');
if (storageRecall) {
  inputArray = JSON.parse(storageRecall);
  renderInputs();
}

const titleRecall = localStorage.getItem('Title');
if (titleRecall) {
  Title_text.value = titleRecall;
}

//*********************************** */
