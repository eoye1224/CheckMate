const express = require('express');
const Task = require('../models/Task'); // Your task model
const router = express.Router();

// Create Task (POST /tasks)
router.post("/", async (req, res) => {
    console.log('Received task data:',req.body);  // Add this to inspect the received data
    try {
        const { title, description, dueDate, reminderTime, label, priority } = req.body;

        // Ensure that all required fields are provided
        if (!title) {
            return res.status(400).json({ message: "Title required." });
        }

        const task = new Task({
            user: req.session.userId,
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
});

module.exports = router;