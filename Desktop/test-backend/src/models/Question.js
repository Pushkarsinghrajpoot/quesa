const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true }, // Question text
    options: [{ type: String, required: true }],    // Array of options
    correctAnswer: { type: String, required: true }, // Correct answer
    subject: { type: String, required: true },      // Subject (e.g., "Math", "Physics")
    topic: { type: String },                        // Topic (e.g., "Algebra")
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);
