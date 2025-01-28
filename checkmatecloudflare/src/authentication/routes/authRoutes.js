const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();  // Ensure dotenv is configured

const router = express.Router();


// Registration route
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

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
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Login route hit');  // Add a log to test if the route is being hit
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);  // Log user not found
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the hashed password using comparePassword method
    const isMatch = await user.comparePassword(password);
    console.log('Plain password:', password);  // Log plain password
    console.log('Stored password hash:', user.password);  // Log stored hash
    console.log('Password match result:', isMatch);  // Log comparison result

    if (isMatch) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      // Send JWT token in HTTP-only cookie or header
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600000, // 1 hour
      });

      res.status(200).json({ message: 'Login successful', token });
    } else {
      console.log('Invalid password attempt');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;