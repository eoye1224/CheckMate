import React from "react";
import "../styles/App.css";

const Sidebar = ({ onSelectTab, theme, onNewTaskClick, username }) => {
  return (
    <div className={`sidebar ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className="sidebar-item" onClick={() => onSelectTab("today")}>
        Today
      </div>
      <div className="sidebar-item" onClick={() => onSelectTab("upcoming")}>
        Upcoming
      </div>
      <div className="sidebar-item" onClick={() => onSelectTab("filtered")}>
        Filtered/Labeled Tasks
      </div>
      <div className="sidebar-item new-task" onClick={onNewTaskClick}>
        New Task
      </div>

      {username && (
        <div className="sidebar-user">
          Logged in as: <strong>{username}</strong>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
