const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  contact: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // 10 digit mobile number
  },
  idProof: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Fix for OverwriteModelError: check if model already exists
const registerModel = mongoose.model("register", registerSchema);

module.exports = registerModel;
