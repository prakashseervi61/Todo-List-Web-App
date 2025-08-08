import React, { useState, useEffect } from 'react';
import './App.css';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

function App() {
  // ——————————————————————
  // State Definitions
  // ——————————————————————
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage or start with an empty array
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme preference from localStorage or default to false
    return localStorage.getItem('theme') === 'dark';
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [time, setTime] = useState(new Date());

  // ——————————————————————
  // Effects: Persist data & Clock
  // ——————————————————————
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ——————————————————————
  // Derived Values
  // ——————————————————————
  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

  // ——————————————————————
  // Handlers
  // ——————————————————————
  const addTask = () => {
    if (!newTask.trim() || editingIndex !== null) return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const deleteTask = index => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedText('');
    }
  };

  const toggleCompleted = index => {
    setTasks(tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleEdit = index => {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
  };

  const saveEdit = index => {
    if (!editedText.trim()) return;
    const updated = [...tasks];
    updated[index].text = editedText;
    setTasks(updated);
    setEditingIndex(null);
    setEditedText('');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleResetClick = () => setShowResetModal(true);
  const handleConfirmReset = () => {
    setTasks([]);
    setShowResetModal(false);
  };
  const handleCancelReset = () => setShowResetModal(false);

  // ——————————————————————
  // Render
  // ——————————————————————
  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className={`reset-overlay ${isDarkMode ? 'dark' : 'light'}`}>
          <div className="reset-box">
            <h2>Are you sure you want to reset?</h2>
            <div className="reset-actions">
              <button className="yes-btn" onClick={handleConfirmReset}>Yes</button>
              <button className="no-btn" onClick={handleCancelReset}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar: Reset, Clock, Theme Toggle */}
      <div className="top-bar">
        <button className="reset-btn" onClick={handleResetClick}>Reset</button>
        <div className="clock">
          <div className="date">
            {time.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
          <div className="day">
            {time.toLocaleDateString('en-IN', { weekday: 'long' })}
          </div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Main App Container */}
      <div className="app-container">
        {/* Title and Task Count */}
        <div className="title-row">
          <h1>To-Do-List</h1>
          <span className="task-count">{completedCount} / {tasks.length} tasks</span>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fg" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">
            {tasks.length === 0 ? "0%" : `${Math.round(progress)}%`} Done
          </span>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            disabled={editingIndex !== null}
          />
          <button onClick={addTask} className="add-btn" disabled={editingIndex !== null}>Add</button>
        </div>

        {/* Task List */}
        <ul>
          {sortedTasks.map((task, _, arr) => {
            const originalIndex = tasks.indexOf(task);
            return (
              <li key={originalIndex} className={task.completed ? 'completed' : ''}>
                <label className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(originalIndex)}
                  />
                  {editingIndex === originalIndex ? (
                    <input
                      type="text"
                      className="edit-input"
                      value={editedText}
                      onChange={e => setEditedText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveEdit(originalIndex)}
                      onBlur={() => saveEdit(originalIndex)}
                      autoFocus
                    />
                  ) : (
                    <span>{task.text}</span>
                  )}
                </label>
                <div className="action-buttons">
                  {editingIndex === originalIndex ? (
                    <button className="save-btn" onClick={() => saveEdit(originalIndex)}>
                      <FaCheck />
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(originalIndex)}>
                      <FaEdit />
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => deleteTask(originalIndex)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
