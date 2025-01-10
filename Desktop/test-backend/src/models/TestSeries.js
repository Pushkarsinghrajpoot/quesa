const mongoose = require('mongoose');

const testSeriesSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Test series name
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true }, // Link to the Exam
    type: { type: String, enum: ['bundle', 'sectional', 'full'], required: true }, // Type of test
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TestSeries', testSeriesSchema);
