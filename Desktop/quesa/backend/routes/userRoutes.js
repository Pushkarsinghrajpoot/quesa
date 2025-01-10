const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Upsert User
router.post('/', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = new User({ username });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
