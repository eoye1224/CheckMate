const express = require('express');
const Task = require('../models/Task'); // Your task model
const authMiddleware = require('../middleware/authmiddleware'); // Your session middleware
const router = express.Router();

// Create Task (POST /tasks)
router.post("/", authMiddleware, async (req, res) => {
    console.log(req.body);  // Add this to inspect the received data
    try {
        const { title, description, dueDate, reminderTime, label, priority } = req.body;

        // Ensure that all required fields are provided
        if (!title) {
          return res.status(400).json({ message: "Title required." });
        }
        
        try {
          const task = new Task({
            user: req.user.id,  // Use the user ID from the session or token
            title,
            description,
            dueDate,
            reminderTime,  // This can be left as undefined if not provided
            label,
            priority,
          });
        
          await task.save();
          res.status(201).json({ message: "Task created successfully", task });
        } catch (error) {
          console.error("Error creating task:", error);
          res.status(500).json({ message: "Server error", error: error.message });
        }
        
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = new Task({
            user: req.user.id,  // Use the user ID from the session
            title,
            dueDate,
            label,
            priority,
        });

        await task.save();
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error("Error creating task:", error);  // Log the error for debugging
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
