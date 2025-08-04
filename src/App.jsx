import React, { useState } from 'react';
import './App.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const addTask = () => {
    if (newTask.trim() === '' || editingIndex !== null) return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedText('');
    }
  };

  const toggleCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (editedText.trim() === '') return;
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedText('');
  };

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
            onKeyDown={e => {
              if (e.key === 'Enter') addTask();
            }}
            disabled={editingIndex !== null}
          />
          <button onClick={addTask} className="add-btn" disabled={editingIndex !== null}>Add</button>
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
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(index);
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'gray' : undefined
                    }}
                  >
                    {task.text}
                  </span>
                )}
              </label>
              <div className="action-buttons">
                {editingIndex === index ? null : (
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    <FaEdit />
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
