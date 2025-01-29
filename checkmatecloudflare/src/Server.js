const express = require('express'); 
const mongoose = require('mongoose'); 
const session = require('express-session'); 
const cors = require('cors'); 
const authRoutes = require('./authentication/routes/authRoutes.js'); 
const taskRoutes = require('./authentication/routes/taskRoutes.js'); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001; // Use environment port or default to 5001

// Session setup for user authentication
app.use(
  session({
    secret: 'your-secret-key', 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
      secure: false, 
      httpOnly: true, 
      maxAge: 3600000 
    },
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS setup to allow requests from specific origin
app.use(
  cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, // Enable cookies and authentication with CORS requests
  })
);

// Register routes for authentication and task management
app.use("/auth", authRoutes); 
app.use("/tasks", taskRoutes); 

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/checkmate', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB')) // Log success message on successful connection
  .catch((err) => {
    console.error("MongoDB connection error:", err); // Log error message on failure
  });

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Confirmation message when the server starts
});
