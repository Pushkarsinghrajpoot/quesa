const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      message: 'User created successfully',
      "user" :{username : user.username, email : user.email}
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ 
      token ,
      id: user._id,
      username: user.username,
      email: user.email});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCurrentUser = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude the password
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser,getCurrentUser };
