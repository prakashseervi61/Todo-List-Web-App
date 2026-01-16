# Modern React Todo List App

A sleek, dark-themed todo list application with a fixed layout and scrollable task container. Built with React and Vite.

## Features

- 🎨 Modern dark theme by default with light mode toggle
- 📊 Real-time progress bar with percentage display
- 🔒 Fixed layout - only the todo list scrolls, no page scrolling
- ✨ Smooth animations: fade-in/out, slide transitions, move-to-bottom on completion
- 💾 LocalStorage persistence for todos and theme preference
- 🎯 Minimalist icon-based UI with inline SVGs
- ⌨️ Keyboard shortcuts (Enter to add, Escape to cancel edit)
- ♿ Fully accessible with ARIA labels
- 📱 Responsive design optimized for desktop

## Layout

- **Fixed Header**: Contains title, theme toggle, and progress indicator
- **Fixed Input**: Add new todos without scrolling
- **Fixed Filters**: All/Active/Completed buttons stay in view
- **Scrollable List**: Only the todo items scroll with custom styled scrollbar
- **Fixed Footer**: Shows remaining items count

## Getting Started

### Run the application:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with dark mode toggle
│   ├── TodoInput.jsx        # Input field for adding todos
│   ├── TodoList.jsx         # List container for todos
│   ├── TodoItem.jsx         # Individual todo item
│   └── FilterButtons.jsx    # Filter buttons (All/Active/Completed)
├── hooks/
│   └── useLocalStorage.js   # Custom hook for localStorage
├── utils/
│   └── helpers.js           # Utility functions
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Custom CSS styles
```

## Usage

- **Add a todo**: Type in the input field and press Enter
- **Complete a todo**: Click the checkbox
- **Edit a todo**: Double-click the text or click the edit icon
- **Delete a todo**: Click the trash icon
- **Filter todos**: Click All, Active, or Completed buttons
- **Toggle theme**: Click the sun/moon icon in the header

## Technologies

- React 19
- Vite
- Custom CSS
- LocalStorage API
