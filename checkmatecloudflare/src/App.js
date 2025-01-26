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
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
          <Form.Check 
            type="checkbox" 
            checked={taskObj.completed} 
            onChange={() => handleCompleteTask(index)} 
            label={
              <span style={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>
                {taskObj.task}
              </span>
            } 
          />
          <Button variant="danger" onClick={() => handleRemoveTask(index)}>Remove</Button>
        </ListGroup.Item>        
        ))}
      </ListGroup>
    </Container>
  );
}

export default App;
