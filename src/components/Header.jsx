import { useMemo } from 'react';
import { SunIcon, MoonIcon } from './Icons';
import { formatDate } from '../utils/helpers';

const Header = ({ total, completed, darkMode, setDarkMode, onOpenMobileMenu }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const dateFormats = useMemo(() => formatDate(), []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-layout">
          <div>
            <h1 className="header-title">
              Todo List
            </h1>
            <p className="header-subtitle">
              {dateFormats.full}
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle desktop-only"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <div className="progress-section">
          <div className="progress-label">
            <span>Progress</span>
            <span className="progress-percentage">{percentage}% completed</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
