import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Add new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle task completion
  const toggleCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Theme toggle
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Progress calculations
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="top-bar">
        <button className="reset-btn" onClick={() => setTasks([])}>Reset</button>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="app-container">
        <div className="title-row">
          <h1>To-Do-List</h1>
          <span className="task-count">
            {completedCount} / {tasks.length} tasks
          </span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fg" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">
            {tasks.length === 0 ? "0%" : `${Math.round(progress)}%`} Done
          </span>
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
          />
          <button onClick={addTask} className="add-btn">Add</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <label className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(index)}
                  className="task-checkbox"
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'gray' : undefined
                  }}
                >
                  {task.text}
                </span>
              </label>
              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
