//add, show, check, delete, save, load
const form = document.querySelector('#todo-form');
const inputBar = form.querySelector('input');
const todoLists = document.querySelector('.todo-lists');
const template = document.querySelector('.lists-template');
const todoListKey = "TODO_LIST_KEY";

let todos = [];                             //array for storing all todo lists
loadData();

//adding and showing todos when user clicks button

form.addEventListener('submit', (e) => {
    e.preventDefault();                     //so that the page doesn't refresh after submitting form
    const todoInput = inputBar.value;
    if (todoInput !== "") {
        const todoDetails = {
            name: todoInput,
            complete: false,
            id: new Date().valueOf().toString()
        }
        todos.push(todoDetails);              //adding new todo to array
        renderTodo(todoDetails);              //showing the newly added todo in html
        inputBar.value="";
    }
})
function renderTodo(todoDetails) {
    const templateClone = template.content.cloneNode(true);   //importing the html template
    const listItem = templateClone.querySelector('.list-item');
    listItem.dataset.todoId = todoDetails.id;
    templateClone.querySelector('[data-list-item-text]').innerHTML = todoDetails.name;
    templateClone.querySelector('[data-list-item-checkbox]').checked = todoDetails.complete;
    todoLists.appendChild(templateClone);   //exporting and adding that template with todo in ul
    saveData();
}


//saving and loading data from storage

function saveData() {
    localStorage.setItem(todoListKey, JSON.stringify(todos));
}
function loadData() {
    const temp = localStorage.getItem(todoListKey);
    if (temp != null) {
        const storageData = JSON.parse(temp);
        storageData.map(item => {
            todos.push(item);
            renderTodo(item);
        });
    }
}

//checking and deleting todos

todoLists.addEventListener('change', (e) => {
    if (e.target.matches('[data-list-item-checkbox]')) {
        const parentLi = e.target.closest('.list-item');
        const todoId = parentLi.dataset.todoId;
        const todo = todos.find(t => t.id == todoId);
        todo.complete = e.target.checked;
    }
    saveData();
})
todoLists.addEventListener('click', (e) => {
    if (e.target.matches('[data-del-button]')) {
        const parentLi = e.target.closest('.list-item');
        const todoId = parentLi.dataset.todoId;
        parentLi.remove();
        todos = todos.filter(t => t.id !== todoId);
        saveData();
    }
})
