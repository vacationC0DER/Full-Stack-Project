// script.js

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        addTodo(todoText);
        todoInput.value = '';
    }
});

function addTodo(text) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        todoList.removeChild(li);
    });
    
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}