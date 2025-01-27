import React from "react";

const ThemeSelector = ({ onThemeChange }) => {
  return (
    <div className="theme-selector">
      <select onChange={(e) => onThemeChange(e.target.value)}>
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
