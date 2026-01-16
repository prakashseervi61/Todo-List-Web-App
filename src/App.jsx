import { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import Toast from './components/Toast';
import ConfirmationModal from './components/ConfirmationModal';
import Suggestions from './components/Suggestions';
import MobileMenu from './components/MobileMenu';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils/helpers';
import { ClearIcon, MoreIcon } from './components/Icons';

export const SUGGESTED_TODOS = [
  'Buy groceries for the week',
  'Schedule dentist appointment',
  'Review project requirements',
  'Plan weekend activities'
];

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: generateId(), text, completed: false, timestamp: Date.now() }]);
  }, [setTodos]);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, [setTodos]);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  const editTodo = useCallback((id, newText) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }, [setTodos]);

  const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos]);
  const activeCount = useMemo(() => todos.length - completedCount, [todos.length, completedCount]);

  const handleClearAll = useCallback(() => {
    if (todos.length === 0) return;
    setModalType('clearAll');
    setShowConfirmModal(true);
  }, [todos.length]);

  const handleClearCompleted = useCallback(() => {
    if (completedCount === 0) return;
    setModalType('clearCompleted');
    setShowConfirmModal(true);
  }, [completedCount]);

  const confirmClear = useCallback(() => {
    if (modalType === 'clearAll') {
      setTodos([]);
      setToast('All todos cleared');
    } else if (modalType === 'clearCompleted') {
      setTodos(prev => prev.filter(t => !t.completed));
      setToast('Completed todos cleared');
    }
    setShowConfirmModal(false);
    setModalType(null);
  }, [modalType, setTodos]);

  const cancelClear = useCallback(() => {
    setShowConfirmModal(false);
    setModalType(null);
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered;
    switch (filter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }
    
    // Sort: active todos first, completed todos at the end
    return filtered.sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }, [todos, filter]);

  const modalConfig = useMemo(() => {
    if (modalType === 'clearAll') {
      return {
        title: 'Clear All Todos?',
        message: 'Are you sure you want to delete all todos? This action cannot be undone.'
      };
    }
    return {
      title: 'Clear Completed Todos?',
      message: `Are you sure you want to delete ${completedCount} completed todo${completedCount > 1 ? 's' : ''}? This action cannot be undone.`
    };
  }, [modalType, completedCount]);

  return (
    <div className="app">
      <Header
        total={todos.length}
        completed={completedCount}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenMobileMenu={() => setShowMobileMenu(true)}
      />

      <main className="main">
        <div className="todo-section">
          <TodoInput onAdd={addTodo} />
        </div>

        <div className="controls">
          <FilterButtons filter={filter} onFilterChange={setFilter} />
          <div className="clear-actions-group desktop-only">
            <div className="clear-buttons">
              {completedCount > 0 && (
                <button
                  onClick={handleClearCompleted}
                  className="btn btn-secondary"
                  aria-label="Clear completed todos"
                >
                  <ClearIcon className="icon-sm" />
                  <span>Clear Completed</span>
                </button>
              )}
              {todos.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="btn btn-danger"
                  aria-label="Clear all todos"
                >
                  <ClearIcon className="icon-sm" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>
          
          <button
            className="mobile-menu-trigger mobile-only"
            onClick={() => setShowMobileMenu(true)}
            aria-label="More options"
          >
            <MoreIcon className="icon-sm" />
          </button>
        </div>

        <div className="todo-list-container">
          {todos.length === 0 ? (
            <Suggestions onAddTodo={addTodo} />
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          )}
        </div>

        {todos.length > 0 && (
          <div className="footer">
            {activeCount} item{activeCount !== 1 ? 's' : ''} left
          </div>
        )}
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <ConfirmationModal 
        isOpen={showConfirmModal}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={confirmClear}
        onCancel={cancelClear}
      />

      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onClearCompleted={handleClearCompleted}
        onClearAll={handleClearAll}
        completedCount={completedCount}
        totalCount={todos.length}
      />
    </div>
  );
}

export default App;
