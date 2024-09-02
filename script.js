// finding elements
const form = document.querySelector(".form");
const inputTodo = document.querySelector("#todoInput");
const ulList = document.querySelector("#ulList");
const message = document.querySelector("#showMessage");

//loading when page is refreshed
document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => creatingTodo(todo));
});

// adding todo
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = inputTodo.value;
  if (inputValue) {
    creatingTodo(inputValue);
    inputTodo.value = "";
  }
  showMessage("Todo is added", "add");
  saveTodos();
});

//creating todo
const creatingTodo = (inputValue) => {
  const listCreation = document.createElement("li");
  listCreation.innerHTML = `<span class="todo">${inputValue}</span><span><button class="btn delete"><i class="fa fa-trash"></i></button></span>`;
  ulList.appendChild(listCreation);
};

//save todos to local storage
const saveTodos = ()=>{
    const todos = Array.from(ulList.children).map(li=>li.querySelector(".todo").textContent);
    localStorage.setItem("todos",JSON.stringify(todos));
};

//show message
const showMessage = (text, status) => {
  message.innerHTML = text;
  message.classList.add(`${status}Message`);
  setTimeout(() => {
    message.innerHTML = "";
    message.classList.remove(`${status}Message`);
  }, 1000);
};

//deletion
ulList.addEventListener("click", (event) => {
  if (event.target.closest(".delete")) {
    event.target.closest("li").remove();
    showMessage("Todo is removed", "delete");
  }
  saveTodos();
});
