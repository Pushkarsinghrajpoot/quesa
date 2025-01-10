const express = require('express');
const { createTestSeries, getTestSeries, getTestSeriesById } = require('../controllers/testSeriesController');
const router = express.Router();

// Routes for Test Series
router.post('/', createTestSeries);         // Create Test Series
router.get('/', getTestSeries);             // Get all Test Series
router.get('/:id', getTestSeriesById);     // Get Test Series by ID

module.exports = router;
