const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Exam name (e.g., "UPSC", "JEE")
    description: { type: String },          // Optional description of the exam
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exam', examSchema);
