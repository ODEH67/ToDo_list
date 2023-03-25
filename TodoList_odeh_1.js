
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


//******************** text gray out ********************************

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

//******************** dark mode ********************************



//******************** list color ********************************



//******************** text delete ********************************

function del_click(event) {
    const clickyElement = event.target;
    
    if (clickyElement.nodeName === "BUTTON") {
    // clickedElement.style.color= "gray";
    // clickedElement.style.textDecoration= "line-through";
    clickyElement.classList.toggle("grayed_out");
    }
}

adding_text.addEventListener("click", del_click);