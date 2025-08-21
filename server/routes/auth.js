const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js"); // 👈 import User model

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashed, role });
    await newUser.save();

    res.json({
      success: true,
      message: "User registered",
      user: { id: newUser._id, username: newUser.username, role: newUser.role }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, error: "Invalid password" });

  res.json({
    success: true,
    message: "Login successful",
    user: { id: user._id, username: user.username, role: user.role }
  });
});



module.exports = router;
