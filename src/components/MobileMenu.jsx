import { useEffect, useRef } from 'react';
import { SunIcon, MoonIcon, ClearIcon } from './Icons';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  darkMode, 
  setDarkMode,
  onClearCompleted,
  onClearAll,
  completedCount,
  totalCount
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="More options">
        <div className="mobile-menu-header">
          <h3>More Options</h3>
          <button 
            className="mobile-menu-close" 
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className="mobile-menu-content">
          <button
            className="mobile-menu-item"
            onClick={() => {
              setDarkMode(!darkMode);
              onClose();
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <SunIcon className="icon-sm" /> : <MoonIcon className="icon-sm" />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {completedCount > 0 && (
            <button
              className="mobile-menu-item"
              onClick={() => {
                onClearCompleted();
                onClose();
              }}
              aria-label="Clear completed todos"
            >
              <ClearIcon className="icon-sm" />
              <span>Clear Completed ({completedCount})</span>
            </button>
          )}

          {totalCount > 0 && (
            <button
              className="mobile-menu-item mobile-menu-item-danger"
              onClick={() => {
                onClearAll();
                onClose();
              }}
              aria-label="Clear all todos"
            >
              <ClearIcon className="icon-sm" />
              <span>Clear All ({totalCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
