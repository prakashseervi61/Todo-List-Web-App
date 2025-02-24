let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to add a new task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task === '') {
        alert('Please enter a task!');
        return;
    }

    tasks.push({ text: task, completed: false });
    taskInput.value = '';
    renderTasks();
    saveTasks();
};

// Function to render tasks
const renderTasks = () => {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    [...incompleteTasks, ...completedTasks].forEach((task, index) => {
        const originalIndex = tasks.findIndex(t => t === task);

        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        if (task.completed) listItem.classList.add('completed');

        listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="updateTaskStatus(${originalIndex})">
            <label class="task-label">${task.text}</label>
            <button class="delete-task" onclick="deleteTask(${originalIndex})">X</button>
        `;

        tasksList.appendChild(listItem);
    });

    updateTaskCount();
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
};

// Function to update task completion status
const updateTaskStatus = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    saveTasks();
};

// Function to update task count & progress bar
const updateTaskCount = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    document.querySelector('.num-task p').textContent = `${completedTasks} / ${totalTasks}`;

    const progressBar = document.querySelector('.progress');
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;
};

// Event Listener: Add Task Button
document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
    addTask();
});

// Event Listener: Enter Key for Adding Tasks
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});

window.onload = function() {
    updateTaskCount();
    renderTasks(); // Render tasks on page load
};