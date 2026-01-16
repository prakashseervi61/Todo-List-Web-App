import { SUGGESTED_TODOS } from '../App';

const Suggestions = ({ onAddTodo }) => {
  const handleSuggestionClick = (suggestion) => {
    onAddTodo(suggestion);
  };

  const handleKeyDown = (e, suggestion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAddTodo(suggestion);
    }
  };

  return (
    <div className="suggestions-container">
      <h3 className="suggestions-title">✨ Suggested Tasks</h3>
      <p className="suggestions-subtitle">Get started with these common tasks, or create your own above</p>
      <div className="suggestions-grid">
        {SUGGESTED_TODOS.map((suggestion, index) => (
          <button
            key={index}
            className="suggestion-chip"
            onClick={() => handleSuggestionClick(suggestion)}
            onKeyDown={(e) => handleKeyDown(e, suggestion)}
            aria-label={`Add task: ${suggestion}`}
          >
            <span className="suggestion-text">{suggestion}</span>
            <span className="suggestion-icon">+</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
