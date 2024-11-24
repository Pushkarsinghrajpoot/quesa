const express = require('express');
const File = require('../models/File');

const router = express.Router();

// Fetch all files for a given project
router.get('/:projectId/files', async (req, res) => {
  const { projectId } = req.params;

  try {
    const files = await File.find({ projectId });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new file for a project
router.post('/:projectId/files', async (req, res) => {
  const { projectId } = req.params;
  const { name, transcript } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'File name is required' });
  }

  try {
    const file = new File({ projectId, name, transcript });
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch a specific file's details
router.get('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a file transcript
router.put('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;
  const { transcript } = req.body;

  try {
    const file = await File.findByIdAndUpdate(
      fileId,
      { transcript, updatedAt: Date.now() },
      { new: true }
    );
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a file
router.delete('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findByIdAndDelete(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
