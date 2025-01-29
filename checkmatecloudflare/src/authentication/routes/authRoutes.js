const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  console.log("Registration data:", req.body); // Check the data coming from the frontend

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create a new user
    const newUser = new User({
      email,
      username,
      password,
    });

    await newUser.save();
    console.log("User saved successfully"); // Debug message
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error during registration:", err.message); // Detailed error logging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route (Using sessions)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;

    console.log(req.session); // Add this to check the session
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
  console.log('Session destroyed');
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
