import React from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskItem.css";

//TaskList component renders a list of tasks.
const TaskList = ({ tasks, onToggleTask, onSetPriority, theme }) => {
  // Check if there are no tasks, and display a message if true
  if (!tasks || tasks.length === 0) {
    return <p className="empty-tasks">No tasks yet. Add one to get started!</p>;
  }

  // Render the list of TaskItem components, passing necessary props
  return (
    <ul className={`task-list ${theme === "dark" ? "dark-mode" : ""}`}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleTask={onToggleTask} 
          onSetPriority={onSetPriority} 
          theme={theme}
        />
      ))}
    </ul>
  );
};

export default TaskList;
