import React from "react";
import ThemeSelector from "./ThemeSelector"; 

// Header component displays the app title and provides functionality to toggle light/dark mode
const Header = ({ onToggleDarkMode, theme, onNewTask }) => {
  return (
    <header>
      {/* Display the app title */}
      <h1>CheckMate: An ADHD-Friendly To-Do List</h1>
      <div className="header-actions">
        {/* Section for mode toggle (light/dark mode) */}
        <div className="mode-toggle">
          {/* Text label for light mode, conditionally styled based on the current theme */}
          <span className={`mode-text ${theme === "light" ? "light" : "dark"}`}>
            Light Mode
          </span>
          
          {/* Checkbox switch for toggling dark mode */}
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"} // Check if the current theme is dark to toggle the checkbox
              onChange={onToggleDarkMode} // Trigger the onToggleDarkMode function when the checkbox changes
            />
            <span className="slider round"></span> {/* Visual slider for the toggle switch */}
          </label>

          {/* Text label for dark mode, conditionally styled based on the current theme */}
          <span className={`mode-text ${theme === "dark" ? "dark" : "light"}`}>
            Dark Mode
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
