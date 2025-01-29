const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },  // Added description
    dueDate: { type: Date, required: true },
    reminderTime: { type: Date, required: false },  // Added reminder time (optional)
    label: { type: String, required: true },
    priority: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
