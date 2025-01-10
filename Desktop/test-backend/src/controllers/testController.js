const Test = require('../models/Test');

// Create a new test
const createTest = async (req, res) => {
    try {
        const { name, testSeriesId, duration, questions } = req.body;
        // Create the new test with embedded question objects
        const newTest = new Test({ name, testSeriesId, duration, questions });
        await newTest.save();
        res.status(201).json({ message: 'Test created successfully', newTest });
    } catch (err) {
        res.status(500).json({ message: 'Error creating test', error: err.message });
    }
};

// Get all tests
const getTests = async (req, res) => {
    try {
        const tests = await Test.find().populate('testSeriesId');
        res.status(200).json(tests);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tests', error: err.message });
    }
};

// Get a specific test by ID
const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).populate('testSeriesId');
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.status(200).json(test);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching test', error: err.message });
    }
};

module.exports = { createTest, getTests, getTestById };
