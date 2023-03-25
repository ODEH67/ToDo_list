

//******************** dark mode ********************************
const dark_mode_button = document.getElementById("dark_button")
const bodyy = document.body
dark_mode_button.addEventListener("click", ()=> {
    document.body.classList.toggle("dark_mode")
    localStorage.setItem("dark_mody", bodyy.classList.contains("dark_mode") ? "on" : "off");    // Save mode to local storage
})

const dark_mode_recall = localStorage.getItem("dark_mody");
if (dark_mode_recall === "on") {
bodyy.classList.add("dark_mode");
} else {
bodyy.classList.remove("dark_mode");
}
//******************** ********************************

const adding_text = document.querySelector(".to_do_text")
const add_text_icon = document.querySelector(".add_text")
const added_text = document.querySelector("#list_input_1")
const Title_text = document.querySelector("#list_title_1")

//****** list input code ***************

let todosArray = []

function addInput(inputValue) {
  const newInput = { id: Date.now().toString(), value: inputValue, grayed_out: false };
  todosArray.push(newInput);
  localStorage.setItem('input_Array', JSON.stringify(todosArray));
  return newInput;
}

function updateInput(inputId, newValues) {
  const inputIndex = todosArray.findIndex(input => input.id === inputId);
  if (inputIndex !== -1) {
    todosArray[inputIndex] = { ...todosArray[inputIndex], ...newValues };
    localStorage.setItem('input_Array', JSON.stringify(todosArray));
  }
}

function removeInput(inputId) {
  todosArray = todosArray.filter(input => input.id !== inputId);
  localStorage.setItem('input_Array', JSON.stringify(todosArray));
}

function renderInputs() {
  const inputs = todosArray;
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
  todosArray = JSON.parse(storageRecall);
  renderInputs();
}

const titleRecall = localStorage.getItem('Title');
if (titleRecall) {
  Title_text.value = titleRecall;
}

//*********************************** */
