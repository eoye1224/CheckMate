import React from "react";
import "../styles/App.css";

// Sidebar component allows navigation between different task views and provides a "New Task" button
const Sidebar = ({ onSelectTab, theme, onNewTaskClick, username }) => {
  return (
    <div className={`sidebar ${theme === "dark" ? "dark-mode" : ""}`}>
      {/* Sidebar item for selecting today's tasks */}
      <div className="sidebar-item" onClick={() => onSelectTab("today")}>
        Today
      </div>

      {/* Sidebar item for selecting upcoming tasks */}
      <div className="sidebar-item" onClick={() => onSelectTab("upcoming")}>
        Upcoming
      </div>

      {/* Sidebar item for filtering and viewing labeled tasks */}
      <div className="sidebar-item" onClick={() => onSelectTab("filtered")}>
        Filtered/Labeled Tasks
      </div>

      {/* Sidebar item to create a new task */}
      <div className="sidebar-item new-task" onClick={onNewTaskClick}>
        New Task
      </div>

      {/* Display logged-in username if provided */}
      {username && (
        <div className="sidebar-user">
          Logged in as: <strong>{username}</strong>
        </div>
      )}
    </div>
  );
};

export default Sidebar;