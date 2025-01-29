// User authentication routes (registration, login, logout)
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  // Destructure user details from the request body
  const { email, username, password } = req.body;

  console.log("Registration data:", req.body); // Log the incoming data for debugging

  try {
    // Check if the user already exists by searching for the email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create a new user object using the provided data
    const newUser = new User({
      email,
      username,
      password, 
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User saved successfully"); // Debugging message
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error during registration:", err.message); // Log any errors for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route 
router.post('/login', async (req, res) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Set user session upon successful login
    req.session.userId = user._id;
    req.session.username = user.username;

    console.log(req.session); // Log the session for debugging
    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  console.log('Session destroyed'); // Log when the session is destroyed
  // Destroy the session and send a response
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
