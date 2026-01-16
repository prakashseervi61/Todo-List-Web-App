const FilterButtons = ({ filter, onFilterChange }) => {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div className="filter-buttons">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f.toLowerCase())}
          className={`filter-btn ${filter === f.toLowerCase() ? 'filter-btn-active' : ''}`}
          aria-label={`Show ${f.toLowerCase()} todos`}
          aria-pressed={filter === f.toLowerCase()}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
