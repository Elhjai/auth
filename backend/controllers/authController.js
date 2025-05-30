const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('🛂 Signup request received:', { username, email });

    // Validate input
    if (!username || !email || !password) {
      console.warn('❌ Missing required fields');
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if email exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      console.warn(`❌ Email already exists: ${email}`);
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if username exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      console.warn(`❌ Username already taken: ${username}`);
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔐 Password hashed successfully');

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`✅ User created: ID ${user.id}, Username ${user.username}`);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      username: user.username,
    });
  } catch (error) {
    console.error('🔥 Signup error:', error);
    res.status(500).json({
      message: 'Server error during signup',
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🛂 Login request received:', { email });

    // Validate input
    if (!email || !password) {
      console.warn('❌ Missing required fields');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.warn(`❌ User not found: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`❌ Invalid password for email: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    console.log(`✅ User logged in: ID ${user.id}, Username ${user.username}`);

    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username,
    });
  } catch (error) {
    console.error('🔥 Login error:', error);
    res.status(500).json({
      message: 'Server error during login',
      error: error.message,
    });
  }
};