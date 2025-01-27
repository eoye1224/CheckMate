<<<<<<< HEAD
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const handleAddTask = (event) => {
    if (event) event.preventDefault(); // Prevent form submission from refreshing the page
    if (task.trim() !== '') {
      setTasks([...tasks, { task: task, completed: false }]);
      setTask('');
    }
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((taskObj) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return taskObj.completed;
    if (filter === 'Pending') return !taskObj.completed;
    return true;
  });

  return (
    <Container className="mt-4">
      <h1 className="text-center">ADHD-Friendly To-Do List</h1>
      <div className="text-center mb-3">
        <Button variant="secondary" onClick={() => setFilter('All')}>All</Button>
        <Button variant="secondary" onClick={() => setFilter('Completed')}>Completed</Button>
        <Button variant="secondary" onClick={() => setFilter('Pending')}>Pending</Button>
      </div>
      
      {/* Make sure the form has an onSubmit handler */}
      <Form onSubmit={handleAddTask} className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="Add a task" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
        />
        <Button variant="primary" onClick={handleAddTask} className="mt-2 w-100">
          Add Task
        </Button>
      </Form>
      
      <h2>Your Tasks:</h2>
      <ListGroup>
        {filteredTasks.map((taskObj, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center"
            style={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>
            <Form.Check 
              type="checkbox" 
              checked={taskObj.completed} 
              onChange={() => handleCompleteTask(index)} 
              label={taskObj.task} 
            />
            <Button variant="danger" onClick={() => handleRemoveTask(index)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
=======
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

>>>>>>> features/task-display-and-function

export default App;
