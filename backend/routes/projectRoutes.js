const express = require('express');
const Project = require('../models/Project');
const File = require('../models/File');

const router = express.Router();

// Fetch all projects for an authenticated user
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const projects = await Project.find({ userId });
    
    // Get file counts for each project
    const projectsWithDetails = await Promise.all(
      projects.map(async (project) => {
        const fileCount = await File.countDocuments({ projectId: project._id });
        return {
          _id: project._id,
          name: project.name,
          files: fileCount,
          lastEdited: project.lastEdited,
          createdAt: project.createdAt
        };
      })
    );

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: 'User ID and project name are required' });
  }

  try {
    const project = new Project({
      userId,
      name,
      files: 0,
      lastEdited: new Date()
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update project last edited time
router.put('/:projectId', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { lastEdited: new Date() },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
