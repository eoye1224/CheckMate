import React from "react";
import ThemeSelector from "./ThemeSelector";

const Header = ({ onToggleDarkMode, theme, onNewTask }) => {
    return (
      <header>
        <h1>CheckMate: An ADHD-Friendly To-Do List</h1>
        <div className="header-actions">
          {/* Add the dark mode toggle with labels */}
          <div className="mode-toggle">
            <span className={`mode-text ${theme === "light" ? "light" : "dark"}`}>
              Light Mode
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={onToggleDarkMode}
              />
              <span className="slider round"></span>
            </label>
            <span className={`mode-text ${theme === "dark" ? "dark" : "light"}`}>
              Dark Mode
            </span>
          </div>
        </div>
      </header>
    );
};

export default Header;
