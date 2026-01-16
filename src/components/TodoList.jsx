import TodoItem from './TodoItem';
import { ClipboardIcon } from './Icons';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <ClipboardIcon className="empty-state-icon" />
        <p className="empty-state-text">No todos yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" role="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
