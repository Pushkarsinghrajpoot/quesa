const TestSeries = require('../models/TestSeries');

// Create a new test series
const createTestSeries = async (req, res) => {
    try {
        const { name, examId, type } = req.body;
        const newTestSeries = new TestSeries({ name, examId, type });
        await newTestSeries.save();
        res.status(201).json({ message: 'Test Series created successfully', newTestSeries });
    } catch (err) {
        res.status(500).json({ message: 'Error creating test series', error: err.message });
    }
};

// Get all test series
const getTestSeries = async (req, res) => {
    try {
        const testSeries = await TestSeries.find().populate('examId');
        res.status(200).json(testSeries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching test series', error: err.message });
    }
};

// Get test series by ID
const getTestSeriesById = async (req, res) => {
    try {
        const testSeries = await TestSeries.findById(req.params.id).populate('examId');
        if (!testSeries) {
            return res.status(404).json({ message: 'Test Series not found' });
        }
        res.status(200).json(testSeries);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching test series', error: err.message });
    }
};

module.exports = { createTestSeries, getTestSeries, getTestSeriesById };
