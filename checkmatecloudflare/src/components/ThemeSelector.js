import React from "react";

// ThemeSelector component allows the user to choose between Light and Dark mode
const ThemeSelector = ({ onThemeChange }) => {
  return (
    <div className="theme-selector">
      {/* Dropdown menu to select light or dark mode */}
      <select onChange={(e) => onThemeChange(e.target.value)}>
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>
    </div>
  );
};

export default ThemeSelector;