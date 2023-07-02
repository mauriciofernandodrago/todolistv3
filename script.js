const localStorageKey = "localstoragetodolist"

document.addEventListener("keypress", function(e) {
    // Verificar se a tecla pressionada é enter
    if (e.keyCode == 13) {
      // Chamar a função addNewTask
      addNewTask();
    }
  });

function validateNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputTextValue = document.getElementById("input-text").value
    let exists = values.find(x => x.name == inputTextValue)
    return exists ? true : false
}
function addNewTask(){
    let inputText = document.getElementById("input-text")
    if (!inputText.value){
        alert("O campo deve ser preenchido")
    }else if (validateNewTask()){
        alert("Digite um valor não repetido")
    }
    else{
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: inputText.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showTasks()
    }
    inputText.value = ""
    inputText.focus()
}
function showTasks(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let taskList = document.getElementById("task-list")
    taskList.innerHTML = ""
    for(let i = 0;i<values.length;i++){
        taskList.innerHTML += `<li>${values[i].name}<button id="btn-delete-task" onclick="removeTask('${values[i].name}')"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg></button></li>`
    }

}
function removeTask(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    console.log(index)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showTasks()
}
showTasks()