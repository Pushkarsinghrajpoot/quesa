const Exam = require('../models/Exam');

// Create a new exam
const createExam = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newExam = new Exam({ name, description });
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully', newExam });
    } catch (err) {
        res.status(500).json({ message: 'Error creating exam', error: err.message });
    }
};

// Get all exams
const getExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching exams', error: err.message });
    }
};

// Get a specific exam by ID
const getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching exam', error: err.message });
    }
};

module.exports = { createExam, getExams, getExamById };
