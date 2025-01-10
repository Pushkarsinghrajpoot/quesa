const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Test name
    testSeriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'TestSeries', required: true }, // Link to the Test Series
    duration: { type: Number, required: true }, // Duration in minutes
    questions: [{                               // Array of question objects
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        subject: { type: String, required: true },
        topic: { type: String },  // Optional
    }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Test', testSchema);
