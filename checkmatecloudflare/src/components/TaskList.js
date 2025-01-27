import React from "react";
import TaskItem from "./TaskItem";
import '../styles/TaskItem.css';

const TaskList = ({ tasks, onToggleTask, onSetPriority, theme }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="empty-tasks">No tasks yet. Add one to get started!</p>;
  }

  return (
    <ul className={`task-list ${theme === "dark" ? "dark-mode" : ""}`}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleTask={onToggleTask} 
          onSetPriority={onSetPriority} 
          theme={theme} // Ensure the theme is passed down to TaskItem
        />
      ))}
    </ul>
  );
};

export default TaskList;
