const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
router.post('/create', async (req, res) => {
  // Logic to create a post
//   console.log('Post created:', req.body);
//   console.log('Post created:', req.cookies);
   const token = req.cookies.token;
   if(!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
   }

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    const user = await userModel.findOne({ _id: decoded.userId });
    console.log('User found:', user);
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(201).json({ message: 'Post created successfully', userId: decoded.userId });
   } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
   }
});


module.exports = router;