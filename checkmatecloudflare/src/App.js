import React, { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Analytics from "./components/Analytics";
import Sidebar from "./components/Sidebar";
import { toggleTaskCompletion, setTaskPriority } from "./utils";
import "./styles/App.css";
import "./styles/TaskItem.css";

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Welcome to CheckMate! 🎉 Start by completing this task to begin your productivity journey.",
      completed: false,
      priority: "medium",
      dueDate: "",
    },
    {
      id: 2,
      title: "Start small: Add just 1 task that's been on your mind 💆",
      completed: false,
      priority: "low",
      dueDate: "",
    },
    {
      id: 3,
      title: "Do a weekly review of my tasks and goals 🔄",
      completed: false,
      priority: "high",
      dueDate: "",
    },
    {
      id: 4,
      title: "Download CheckMate on your phone for easy access 📱",
      completed: false,
      priority: "low",
      dueDate: "",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [theme, setTheme] = useState("light");
  const [selectedTab, setSelectedTab] = useState("all");
  const [taskInput, setTaskInput] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  const toggleTaskCompletion = (task) => {
    return { ...task, completed: !task.completed };
  };

  const addTask = (title, priority) => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      priority: priority || "medium",
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      console.log("Tasks after addition:", updatedTasks);
      return updatedTasks;
    });
  };

  const handleToggleTask = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? toggleTaskCompletion(t) : t)));
  };

  const handleSetPriority = (task, priority) => {
    setTasks(tasks.map((t) => 
      t.id === task.id ? { ...t, priority: priority } : t
    ));
  };

  const getTabFilteredTasks = () => {
    switch (selectedTab) {
      case "today":
        return tasks.filter((task) => task.dueDate === "today");
      case "upcoming":
        return tasks.filter((task) => task.dueDate && task.dueDate > "today");
      default:
        return tasks;
    }
  };

  const getCompletionProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  return (
    <div className={`app-container ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className={`sidebar ${!isSidebarVisible ? "hidden" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
        <Sidebar onSelectTab={setSelectedTab} theme={theme} />
      </div>

      <div className="main-content">
        <Header onToggleDarkMode={toggleDarkMode} theme={theme} />
        <div className="task-container">
          <TaskList
            tasks={getTabFilteredTasks()}
            filterStatus={filterStatus}
            onToggleTask={handleToggleTask}
            onSetPriority={handleSetPriority}
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
            <button
              onClick={() => {
                if (taskInput.trim()) {
                  addTask(taskInput, taskPriority);
                  setTaskInput("");
                }
              }}
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

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');  // Adjust the class if necessary

  // Log the elements to ensure they are not null
  console.log(toggleButton, sidebar, mainContent);

  // Make sure the elements exist before adding the event listener
  if (toggleButton && sidebar && mainContent) {
      toggleButton.addEventListener('click', () => {
          sidebar.classList.toggle('hidden');  // Hide or show the sidebar
          mainContent.classList.toggle('sidebar-hidden');  // Adjust the main content layout
      });
  } else {
      console.error("Sidebar or main content elements not found.");
  }
});


export default App;
