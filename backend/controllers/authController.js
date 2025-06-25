const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  });
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // For demo purposes, we'll simulate user registration
    if (require('mongoose').connection.readyState === 1) {
      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        });
      }
    } else {
      // Demo mode - simulate successful registration
      res.status(201).json({
        _id: 'demo_user_id',
        name,
        email,
        token: generateToken('demo_user_id')
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // For demo purposes, we'll simulate user login
    if (require('mongoose').connection.readyState === 1) {
      // Check for user
      const user = await User.findOne({ email });

      if (user && (await user.comparePassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      // Demo mode - accept any credentials
      if (email && password) {
        res.json({
          _id: 'demo_user_id',
          name: 'Demo User',
          email,
          token: generateToken('demo_user_id')
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};