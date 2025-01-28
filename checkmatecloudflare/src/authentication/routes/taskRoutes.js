const express = require('express');
const Task = require('../models/Task'); // Your task model
const authMiddleware = require('../middleware/authmiddleware'); // Your JWT middleware
const router = express.Router();

// Create Task Route (protected)
router.post('/tasks', authMiddleware, async (req, res) => {
  const { title, dueDate, priority } = req.body;

  try {
    // Use req.userId to associate the task with the logged-in user
    const newTask = new Task({
      title,
      dueDate,
      priority,
      userId: req.userId, // This is the ID of the authenticated user
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
