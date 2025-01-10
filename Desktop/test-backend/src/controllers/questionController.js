const Question = require('../models/Question');

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const { questionText, options, correctAnswer, subject, topic } = req.body;
        const newQuestion = new Question({ questionText, options, correctAnswer, subject, topic });
        await newQuestion.save();
        res.status(201).json({ message: 'Question created successfully', newQuestion });
    } catch (err) {
        res.status(500).json({ message: 'Error creating question', error: err.message });
    }
};

// Get all questions
const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
};

// Get random practice questions based on subject and topic
const getPracticeQuestions = async (req, res) => {
    const { subject, topic } = req.query;
    try {
        const query = {};
        if (subject) query.subject = subject;
        if (topic) query.topic = topic;

        const questions = await Question.aggregate([{ $match: query }, { $sample: { size: 10 } }]);
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching practice questions', error: err.message });
    }
};

module.exports = { createQuestion, getQuestions, getPracticeQuestions };
