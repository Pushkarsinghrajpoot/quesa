const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const testSeriesRoutes = require('./routes/testSeriesRoutes');
const testRoutes = require('./routes/testRoutes');
const questionRoutes = require('./routes/questionRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/test-series', testSeriesRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/question-banks', questionBankRoutes);

// Error handling middleware (to be added later)
module.exports = app;
