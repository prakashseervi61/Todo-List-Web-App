import { useState, memo, useRef } from 'react';
import { EditIcon, TrashIcon } from './Icons';
import { formatTime } from '../utils/helpers';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const clickTimerRef = useRef(null);
  const clickCountRef = useRef(0);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleRowClick = (e) => {
    // Don't toggle if clicking on buttons, checkbox, or input
    if (
      e.target.closest('.todo-actions') ||
      e.target.closest('.todo-checkbox') ||
      e.target.closest('.todo-edit-input') ||
      isEditing
    ) {
      return;
    }

    // Don't toggle if user is selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }

    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      // Single click - wait to see if it's a double click
      clickTimerRef.current = setTimeout(() => {
        // Single click confirmed - toggle
        onToggle(todo.id);
        clickCountRef.current = 0;
      }, 250);
    } else if (clickCountRef.current === 2) {
      // Double click - enter edit mode
      clearTimeout(clickTimerRef.current);
      clickCountRef.current = 0;
      if (!todo.completed) {
        setIsEditing(true);
      }
    }
  };

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      onClick={handleRowClick}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        onClick={(e) => e.stopPropagation()}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="todo-edit-input"
          autoFocus
          aria-label="Edit todo"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="todo-text-container">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
          <span className="todo-timestamp">
            Added at {formatTime(todo.timestamp)}
          </span>
        </div>
      )}

      <div className="todo-actions" onClick={(e) => e.stopPropagation()}>
        {!isEditing && !todo.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="todo-btn-edit"
            aria-label="Edit todo"
          >
            <EditIcon className="icon-sm" />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="todo-btn-delete"
          aria-label="Delete todo"
        >
          <TrashIcon className="icon-sm" />
        </button>
      </div>
    </li>
  );
};

export default memo(TodoItem);
