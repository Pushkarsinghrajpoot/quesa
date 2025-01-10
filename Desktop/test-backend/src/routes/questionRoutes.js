const express = require('express');
const { createQuestion, getQuestions, getPracticeQuestions } = require('../controllers/questionController');
const router = express.Router();

// Routes for Questions
router.post('/', createQuestion);           // Create Question
router.get('/', getQuestions);              // Get all Questions
router.get('/practice', getPracticeQuestions); // Get Random Practice Questions

module.exports = router;
