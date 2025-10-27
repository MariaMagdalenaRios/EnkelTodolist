let todos = [];
let nextId = 1;

const input = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("task-list");

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const taskText = input.value.trim();
    if (taskText) {
        todos.push({ id: nextId++, 
        text: taskText });
        input.value = "";
        renderTodos();
    }
}
addButton.addEventListener("click", addTodo);