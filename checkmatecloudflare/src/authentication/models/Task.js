const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    label: { type: String, required: true },
    priority: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);