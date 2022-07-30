const FormElement = document.querySelector(".my-form");
const inputElement = document.querySelector(".task");
const ulElement = document.querySelector(".list");
const dateElement = document.querySelector(".date");
let list = JSON.parse( localStorage.getItem('list'))

list.forEach(task=>{
  toDoList(task)
});

function date(){
  let currentDate = new Date();
  let local = currentDate.toLocaleString();
  dateElement.innerText = local;
  setInterval(date, 1000)
}
date();

FormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputElement.value;
  if(task){
    newTask = task.name
  }
  const listElement = document.createElement("li");
  if (task && task.checked) {
    listElement.classList.add("checked");
  }
  listElement.innerText = newTask;
  ulElement.appendChild(listElement);
  inputElement.value = "";
  const checkBtnElement = document.createElement("div");
  checkBtnElement.innerHTML = `<i class="fas fa-check-square"></i>`;
  listElement.appendChild(checkBtnElement);
  const deleteBtnElement = document.createElement("div");
  deleteBtnElement.innerHTML = `<i class="fas fa-trash"></i>
        </li>`;
  listElement.appendChild(deleteBtnElement);

  checkBtnElement.addEventListener('click', ()=>{
    listElement.classList.toggle('checked')
    updateLocalStorage(); 
  });
  deleteBtnElement.addEventListener('click', ()=>{
    listElement.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage(){
  const allLiElements = document.querySelectorAll('li');
  let list = [];
  allLiElements.forEach(liElement =>{
    list.push({
      name: liElement.innerText,
      checked: liElement.classList.contains('checked')
    })
  })

  localStorage.setItem('list', JSON.stringify(list));

}
