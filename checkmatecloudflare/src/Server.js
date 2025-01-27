const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer(); // Default setup to handle file uploads
app.use(express.json());

// In-memory storage for simplicity (replace with Cloudflare R2 or database)
let tasks = [];

// Create Task (POST)
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file; // Get the uploaded file
    uploadFileToR2(file.buffer, file.originalname);
    res.status(200).json({ message: 'File uploaded successfully' });
  });

// Get All Tasks (GET)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update Task (PUT)
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete Task (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).end();
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
