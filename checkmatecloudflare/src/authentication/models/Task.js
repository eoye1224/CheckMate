const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { 
        type: Date, 
        required: false, 
        default: null  // Allows it to be optional
    },
    reminderTime: { 
        type: Date, 
        required: false,
        set: (value) => {
            if (typeof value === 'string') {
                if (value === '') {
                    return null; // Handle empty string gracefully
                }
                const date = new Date();
                const [hours, minutes] = value.split(':').map(Number);
                date.setHours(hours);
                date.setMinutes(minutes);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            }
            return value; // Return the value if it's already a Date
        }
    },
    label: { type: String, required: false },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        required: false 
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
