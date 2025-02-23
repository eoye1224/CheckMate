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
import "./styles/LoginPopup.css";  

const App = () => {
  // State variables for tasks and task input form
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

 // State for theme, sidebar visibility, and user authentication
 const [theme, setTheme] = useState("light");
 const [isSidebarVisible, setSidebarVisible] = useState(true);
 const [selectedTab, setSelectedTab] = useState("tasks");
 const [taskInputVisible, setTaskInputVisible] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [user, setUser] = useState(null);
 const [showLoginPopup, setShowLoginPopup] = useState(true);
 const [showRegisterPopup, setShowRegisterPopup] = useState(false);
 const [isRegistered, setIsRegistered] = useState(false); // Control register screen

 // Toggle the sidebar visibility
 const toggleSidebar = () => {
   setSidebarVisible(!isSidebarVisible);
 };

 // Toggle between light and dark mode
 const toggleDarkMode = () => {
   setTheme(theme === "light" ? "dark" : "light");
 };

 // Add a new task if the user is logged in and input is valid
 const addTask = async () => {
   if (!isLoggedIn) {
     console.error("User is not logged in.");
     return; // Exit the function if the user is not logged in
   }

   if (!taskInput.trim()) return;

   const task = {
     title: taskInput,
     description: taskDescription || 'Not provided',
     dueDate: taskDueDate,
     reminderTime: reminderTime,
     label: taskLabel || 'general',
     priority: taskPriority || 'medium',
     completed: false
   };

   axios.post("http://localhost:5001/tasks", task, { withCredentials: true })
     .then(response => {
       console.log('Task added successfully:', response.data);
     })
     .catch(error => {
       console.error('Error adding task:', error);
     });
 };

 // Clear task input form
 const clearTaskForm = () => {
   setTaskInput("");
   setTaskDescription("");
   setTaskPriority("medium");
   setTaskDueDate("");
   setReminderTime("");
   setTaskLabel("general");
   setTaskInputVisible(false);
 };

 // Toggle visibility of the task input form
 const onNewTask = () => {
   setTaskInputVisible(!taskInputVisible);
 };

 // Handle successful login
 const handleLoginSuccess = (userData) => {
   setIsLoggedIn(true);
   setUser(userData.username); 
   setShowLoginPopup(false);
 };

 // Handle user login via API
 const login = async (email, password) => {
   try {
     const response = await axios.post("http://localhost:5001/auth/login", { email, password }, { withCredentials: true });
     console.log("Login response data:", response.data);
     handleLoginSuccess({
       username: response.data.username,
       userId: response.data.userId,  
     });
   } catch (error) {
     console.error("Login failed:", error);
   }
 };

 // Handle user registration via API
 const handleRegister = async (email, password, username) => {
   try {
     console.log("Registration data:", { email, password, username });
     const response = await axios.post("http://localhost:5001/auth/register", { email, password, username }, { withCredentials: true });
     if (response.status === 201) {
       console.log('Registration successful:', response.data);
       setUser(username);  // Update the username state
       setIsLoggedIn(true);  // Mark the user as logged in
       setShowRegisterPopup(false);  // Close the registration popup
       setShowLoginPopup(false);  // Close the login popup
     }
   } catch (error) {
     console.error("Registration failed:", error);
   }
 };

 // Calculate the completion progress of tasks
 const getCompletionProgress = () => {
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter(task => task.completed).length;
   return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
 };

 return (
   <div className={`app-container ${theme === "dark" ? "dark-mode" : ""}`}>
     
     {/* Login Popup */}
     {showLoginPopup && (
       <div className="login-popup">
         <div className="login-popup-content">
           <h2>Login</h2>
           <input type="email" placeholder="Email" id="email" />
           <input type="password" placeholder="Password" id="password" />
           <button onClick={() => login(document.getElementById("email").value, document.getElementById("password").value)}>
             Login
           </button>
           <p>
             No account?{" "}
             <button onClick={() => { setShowLoginPopup(false); setShowRegisterPopup(true); }}>
               Register here
             </button>
           </p>
         </div>
       </div>
     )}

     {/* Register Popup */}
     {showRegisterPopup && (
       <div className="login-popup">
         <div className="login-popup-content">
           <h2>Register</h2>
           <input type="text" placeholder="Username" id="username" />
           <input type="email" placeholder="Email" id="register-email" />
           <input type="password" placeholder="Password" id="register-password" />
           <button onClick={() => {
             const username = document.getElementById("username").value;
             const email = document.getElementById("register-email").value;
             const password = document.getElementById("register-password").value;
             handleRegister(email, password, username);
           }}>
             Register
           </button>
           <p>
             Already have an account?{" "}
             <button onClick={() => { setShowRegisterPopup(false); setShowLoginPopup(true); }}>
               Back to Login
             </button>
           </p>
         </div>
       </div>
     )}

     {/* Main App Content */}
     {!showLoginPopup && !showRegisterPopup && isLoggedIn && (
       <div className={`sidebar ${!isSidebarVisible ? "hidden" : ""}`}>
         <Sidebar onSelectTab={setSelectedTab} theme={theme} onNewTaskClick={onNewTask} username={user} />
         <p className="sidebar-username">{user}</p>  {/* Show the username here */}
         <button onClick={onNewTask} className="new-task-btn">New Task</button>
       </div>
     )}

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