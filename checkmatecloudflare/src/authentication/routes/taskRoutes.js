// Task management routes (creating tasks)
const express = require('express');
const Task = require('../models/Task'); 
const router = express.Router();

// Create Task route (POST /tasks)
router.post("/", async (req, res) => {
    // Log the task data received from the client (for debugging)
    console.log('Received task data:', req.body);

    try {
        // Destructure task details from the request body
        const { title, description, dueDate, reminderTime, label, priority } = req.body;

        // Check if the title is provided (required field)
        if (!title) {
            return res.status(400).json({ message: "Title required." }); // Return error if no title is provided
        }

        // Create a new task instance using the provided data
        const task = new Task({
            user: req.session.userId, // Associate the task with the logged-in user
            title,
            description,
            dueDate,
            reminderTime,  
            label,
            priority,
        });

        // Save the task to the database
        await task.save();

        // Respond with a success message and the created task
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        // Log any errors and send a response with the error message
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
