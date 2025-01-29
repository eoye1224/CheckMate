import React, { useState } from "react";
import "../styles/TaskItem.css";

const TaskItem = ({ task, onToggleTask, onSetPriority, theme }) => {
  const [showPriority, setShowPriority] = useState(false);

  // Ensure task exists before rendering
  if (!task) return null; 

  //Function to get the appropriate priority color based on task priority level.
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "#FF4D4D"; // Red
      case "medium":
        return "#FFCC00"; // Yellow
      case "low":
        return "#4DFF4D"; // Green
      default:
        return "#FFCC00"; // Default to Yellow
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} ${theme === "dark" ? "dark-mode" : ""}`}>
      {/* Checkbox to toggle task completion */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task)}
      />
      {/* Display task title, with styled class if completed */}
      <span className={task.completed ? "completed" : ""}>{task.title}</span>

      <div className="priority-wrapper">
        {/* Priority indicator circle, toggles dropdown on click */}
        <div
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor() }}
          onClick={() => setShowPriority(!showPriority)}
        />
        {/* Priority selection dropdown, visible when showPriority is true */}
        {showPriority ? (
          <select
            value={task.priority}
            onChange={(e) => onSetPriority(task, e.target.value)}
            className="priority-dropdown"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        ) : null}
      </div>
    </li>
  );
};

export default TaskItem;
