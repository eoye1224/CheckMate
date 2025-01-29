// User Schema definition for MongoDB using Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware to hash password before saving it to the database
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Use bcrypt to hash the password
  this.password = await bcrypt.hash(this.password, 10);
  
  // Proceed with saving the user document
  next();
});

userSchema.methods.comparePassword = function (password) {
  // Use bcrypt's compare method to check if the entered password matches the hashed password
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
