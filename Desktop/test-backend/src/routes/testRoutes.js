const express = require('express');
const { createTest, getTests, getTestById } = require('../controllers/testController');
const router = express.Router();

// Routes for Tests
router.post('/', createTest);               // Create Test
router.get('/', getTests);                  // Get all Tests
router.get('/:id', getTestById);            // Get Test by ID

module.exports = router;
