const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./authentication/routes/authRoutes.js');
const taskRoutes = require('./authentication/routes/taskRoutes.js');
const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration if needed
app.use(
  cors({
    origin: 'http://localhost:3000',  // Replace this with the actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    credentials: true,}
));

app.use(express.json());

// Session setup
app.use(
  session({
    secret: 'your-secret-key', // Choose a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use secure: true in production with HTTPS
  })
);

// Routes
app.use("/auth", authRoutes); // User authentication routes
app.use("/tasks", taskRoutes); // Task-related routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/checkmate', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
