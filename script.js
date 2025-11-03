// Get todos from localStorage or start with empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the todo list
function renderTodos() {
    taskList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `task-item ${todo.completed ? 'completed' : ''}`;
        
        // Create task text span
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = todo.text;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        
        // Add event listeners
        li.addEventListener('click', () => toggleTodo(todo.id));
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });
        
        // Append elements
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Add new todo
function addTodo(text) {
    const todo = {
        id: nextId++,
        text: text,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Form submit handler
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        addTodo(text);
        taskInput.value = '';
    }
});

// Initial render
renderTodos();