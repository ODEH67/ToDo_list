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

//****************** add new list ************************ */

const addListLink = document.getElementById("list_add");
const newListTemplate = document.querySelector(".list_new");
const listDiv = document.querySelector(".list");


addListLink.addEventListener("click", function(event) {     // add a new list

event.preventDefault();
const newList = newListTemplate.cloneNode(true);    // cloning the template

const timestamp = Date.now();        //  set ID of new list to a unique value
newList.id = "list_" + timestamp;

// const adding_textt = newList.querySelector(".to_do_text");              // instead of using .querySelector(".to_do_text"); which chooses the the first list only
// const add_text_iconn = newList.querySelector(".add_text");                   // instead of using .querySelector(".add_text"); which chooses the the first list only
// const added_textt = newList.querySelector("#list_input_1");                  // instead of using .querySelector("#list_input_1"); which chooses the the first list only
// const Title_textt = newList.querySelector("#list_title_1");                   // instead of using .querySelector("#list_title_1"); which chooses the the first list only


// adding_textt.classList = "to_do_text" + timestamp;
// add_text_iconn.classList = "add_text" + timestamp;
// added_textt.id = "list_input_" + timestamp;
// Title_textt.id = "list_title_" + timestamp;

listDiv.appendChild(newList);       // Add the new list
newList.setAttribute('class', 'list_new');
newList.setAttribute('style', 'display: block');

localStorage.setItem(newList.id, newList.innerHTML);    // Save the new list to local storage
});


for (let i = 0; i < localStorage.length; i++) {     // Restore / load the list from local storage
    const key = localStorage.key(i);
    if (key.startsWith("list_")) {
    const listHTML = localStorage.getItem(key);
    const newList = document.createElement("div");
    newList.id = key;
    newList.innerHTML = listHTML;
    listDiv.appendChild(newList);
    newList.setAttribute('class', 'list_new');
    newList.setAttribute('style', 'display: block');
    }
    }

    /******************* inside the list ************************/

const adding_text = newList.querySelector(".to_do_text");              // instead of using .querySelector(".to_do_text"); which chooses the the first list only
const add_text_icon = newList.querySelector(".add_text");                   // instead of using .querySelector(".add_text"); which chooses the the first list only
const added_text = newList.querySelector("#list_input_1");                  // instead of using .querySelector("#list_input_1"); which chooses the the first list only
const Title_text = newList.querySelector("#list_title_1");                   // instead of using .querySelector("#list_title_1"); which chooses the the first list only


function grayed_click(event) {
    const clickedElement = event.target;
    
    if (clickedElement.nodeName === "LI") {
    // clickedElement.style.color= "gray";
    // clickedElement.style.textDecoration= "line-through";
    clickedElement.classList.toggle("grayed_out");
    }
}

adding_text.addEventListener("click", grayed_click);

//***** list input code ****************
todosArray = []

function textGen(e) {

    const input_value = added_text.value.trim()
    const new_text = document.createElement("li")
    const Del_text = document.createElement("button")   //******* Del button


    Title_text_value = Title_text.value.trim()

    if (Title_text_value !== "" ) {

        e.preventDefault();
        
        localStorage.setItem('Title',Title_text_value)      //******* Title storing
        
    if (input_value !== ""){
    
        adding_text.appendChild(new_text)
        new_text.textContent = input_value
        new_text.appendChild(Del_text)      //******* Del button

        todosArray.push(input_value)
        const stringArray = JSON.stringify(todosArray)
        localStorage.setItem('input_Array',stringArray)
        localStorage.setItem('del_button',Del_text)         //******* Del button
    } 
    added_text.value = ""
}

}
add_text_icon.addEventListener("click", textGen)

Title_text.addEventListener('blur', textGen)


const StorageRecall = localStorage.getItem('input_Array')
const TitleRecall = localStorage.getItem('Title')   //************* Title calling
const DelRecall = localStorage.getItem('del_button')    //******* Del button

const ReArray = JSON.parse(StorageRecall)
Title_text.value = TitleRecall  //************* Title inputing

for(let i = 0; i< ReArray.length; i++) {

    const new_text = document.createElement("li")
    const Del_text = document.createElement("button")   //******* Del button
    adding_text.appendChild(new_text)
    new_text.textContent = ReArray[i]
    new_text.appendChild(Del_text)      //******* Del button

    todosArray.push(ReArray[i])
}
