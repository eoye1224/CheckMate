import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header.js";
import TaskList from "./components/TaskList.js";
import Analytics from "./components/Analytics.js";
import Sidebar from "./components/Sidebar.js";
import { toggleTaskCompletion, setTaskPriority } from "./utils";
import "./styles/App.css";
import "./styles/TaskItem.css";

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
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [theme, setTheme] = useState("light");
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState("tasks");

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;
    const task = { title: taskInput, dueDate: taskDueDate, label: "general", priority: taskPriority };

    try {
      const response = await axios.post("http://localhost:5000/tasks", task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
       // Log before updating state
      console.log('Before update:', tasks);
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, response.data.task];
        console.log('After update:', updatedTasks);
        return updatedTasks;
      });
      setTaskInput("");
      setTaskPriority("medium");
      setTaskDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const getCompletionProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  }; 

  return (
    <div className={`app-container ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className={`sidebar ${!isSidebarVisible ? "hidden" : ""}`}>
        <Sidebar onSelectTab={setSelectedTab} theme={theme} />
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-expanded={isSidebarVisible}>
        ☰
      </button>
      <div className="main-content">
        <Header onToggleDarkMode={toggleDarkMode} theme={theme} />
        <div className="task-container">
          <TaskList
            tasks={tasks}
            theme={theme}
          />
          <div className="task-input">
            <input
              type="text"
              placeholder="New Task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className={`task-input-field ${theme === "dark" ? "dark-mode" : ""}`}
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className={`priority-selector ${theme === "dark" ? "dark-mode" : ""}`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className={`due-date-field ${theme === "dark" ? "dark-mode" : ""}`}
            />
            <button
              onClick={addTask}
              className={`add-task-btn ${theme === "dark" ? "dark-mode" : ""}`}
            >
              Add Task
            </button>
          </div>

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