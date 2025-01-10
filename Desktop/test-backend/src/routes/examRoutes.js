const express = require('express');
const { createExam, getExams, getExamById } = require('../controllers/examController');
const router = express.Router();

// Routes for Exam
router.post('/', createExam);               // Create Exam
router.get('/', getExams);                  // Get all Exams
router.get('/:id', getExamById);            // Get a specific Exam by ID

module.exports = router;
