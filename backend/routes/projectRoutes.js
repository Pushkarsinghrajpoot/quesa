const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Fetch all projects for an authenticated user
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new project for an authenticated user
router.post('/', async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: 'User ID and project name are required' });
  }

  try {
    const project = new Project({ userId, name });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
