const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new userModel({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

module.exports = { registerUser };