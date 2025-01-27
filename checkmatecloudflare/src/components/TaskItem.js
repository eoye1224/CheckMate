import React, { useState } from "react";
import "../styles/TaskItem.css";

const TaskItem = ({ task, onToggleTask, onSetPriority, theme }) => {
  const [showPriority, setShowPriority] = useState(false);

  if (!task) return null; // Ensure task exists before rendering

  return (
    <li className={`task-item ${theme === "dark" ? "dark-mode" : ""}`}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggleTask(task)} 
      />
      <span className={task.completed ? "completed" : ""}>{task.title}</span>

      {showPriority ? (
        <select 
          value={task.priority} 
          onChange={(e) => onSetPriority(task, e.target.value)} 
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      ) : (
        <button onClick={() => setShowPriority(true)}>Set Priority</button>
      )}
    </li>
  );
};

export default TaskItem;
