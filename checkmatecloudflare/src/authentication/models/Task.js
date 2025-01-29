// Task Schema definition for MongoDB using Mongoose
const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
    // The user associated with this task, referencing the 'User' collection
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Title of the task (required field)
    title: { type: String, required: true },

    // Optional description for the task
    description: { type: String, required: false },

    // Due date for the task (optional, can be null)
    dueDate: { 
        type: Date, 
        required: false, 
        default: null  // Allows the due date to be optional
    },

    // Reminder time for the task (optional, parsed into Date if given as a string)
    reminderTime: { 
        type: Date, 
        required: false,
        set: (value) => {
            // If value is a string, attempt to parse it into a Date object
            if (typeof value === 'string') {
                if (value === '') {
                    return null; // Handle empty string by returning null
                }
                // Parse hours and minutes from the string (format 'HH:MM')
                const date = new Date();
                const [hours, minutes] = value.split(':').map(Number);
                date.setHours(hours);
                date.setMinutes(minutes);
                date.setSeconds(0);  // Reset seconds and milliseconds for precision
                date.setMilliseconds(0);
                return date; // Return the parsed Date
            }
            return value; // If the value is already a Date, return it as is
        }
    },

    // Optional label for the task
    label: { type: String, required: false },

    // Priority of the task (can be 'low', 'medium', or 'high', optional)
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        required: false 
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('Task', taskSchema);
