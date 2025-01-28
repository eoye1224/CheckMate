import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header.js";
import TaskList from "./components/TaskList.js";
import Analytics from "./components/Analytics.js";
import Sidebar from "./components/Sidebar.js";
import { toggleTaskCompletion, setTaskPriority } from "./utils";
import "./styles/App.css";
import "./styles/TaskItem.css";
import "./styles/TaskInputForm.css";  // Import the new CSS file for task input form

const App = () => {
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: "Welcome to CheckMate! 🎉 Start by completing this task to begin your productivity journey.",
    //   completed: false,
    //   priority: "medium",
    //   dueDate: "",
    // },
    // {
    //   id: 2,
    //   title: "Start small: Add just 1 task that's been on your mind 💆",
    //   completed: false,
    //   priority: "low",
    //   dueDate: "",
    // },
    // {
    //   id: 3,
    //   title: "Do a weekly review of my tasks and goals 🔄",
    //   completed: false,
    //   priority: "high",
    //   dueDate: "",
    // },
    // {
    //   id: 4,
    //   title: "Download CheckMate on your phone for easy access 📱",
    //   completed: false,
    //   priority: "low",
    //   dueDate: "",
    // },
  ]);

  const [taskInput, setTaskInput] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [taskLabel, setTaskLabel] = useState("general");
  const [theme, setTheme] = useState("light");
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState("tasks");
  const [taskInputVisible, setTaskInputVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;

    const task = {
      title: taskInput,
      description: taskDescription,
      dueDate: taskDueDate,
      reminderTime: reminderTime,
      label: taskLabel,
      priority: taskPriority,
      completed: false,
    };

    try {
      const response = await axios.post("http://localhost:5001/tasks", task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      clearTaskForm();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const clearTaskForm = () => {
    setTaskInput("");
    setTaskDescription("");
    setTaskPriority("medium");
    setTaskDueDate("");
    setReminderTime("");
    setTaskLabel("general");
    setTaskInputVisible(false);
  };

  const onNewTask = () => {
    setTaskInputVisible(!taskInputVisible);
  };

  // Get completion progress
  const getCompletionProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className={`app-container ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className={`sidebar ${!isSidebarVisible ? "hidden" : ""}`}>
        <Sidebar onSelectTab={setSelectedTab} theme={theme} onNewTaskClick={onNewTask} />
        <button onClick={onNewTask} className="new-task-btn">
          New Task
        </button>
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-expanded={isSidebarVisible}>
        ☰
      </button>
      <div className="main-content">
        <Header onToggleDarkMode={toggleDarkMode} theme={theme} />
        <div className="task-container">
          <TaskList tasks={tasks} theme={theme} />
          
          {taskInputVisible && (
            <div className={`task-input-form ${taskInputVisible ? "visible" : ""} ${theme === "dark" ? "dark-mode" : ""}`}>
              <button onClick={clearTaskForm} className="cancel-button">×</button>

              <label htmlFor="taskInput">Task</label>
              <input
                id="taskInput"
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter a new task"
                required
              />

              <label htmlFor="taskDescription">Description</label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Add a description"
              />

              <label htmlFor="taskDueDate">Due Date</label>
              <input
                id="taskDueDate"
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />

              <label htmlFor="reminderTime">Reminder Time</label>
              <input
                id="reminderTime"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />

              <label htmlFor="taskPriority">Priority</label>
              <select
                id="taskPriority"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <label htmlFor="taskLabel">Label</label>
              <select
                id="taskLabel"
                value={taskLabel}
                onChange={(e) => setTaskLabel(e.target.value)}
              >
                <option value="general">General</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>

              <button onClick={addTask}>Add Task</button>
            </div>
          )}

          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${getCompletionProgress()}%` }} />
            <p>{getCompletionProgress()}% Completed</p>
          </div>
        </div>
        <Analytics tasks={tasks} theme={theme} />
      </div>
    </div>
  );
};

export default App;