// src/models/QuestionBank.js
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }], // e.g., ["Option A", "Option B", "Option C", "Option D"]
  correctOption: { type: Number, required: true }, // Index of the correct option
  exam: { type: String, required: true }, // Exam tag, e.g., "NEET", "JEE"
  subject: { type: String, required: true }, // Subject tag, e.g., "Physics", "Math"
  topic: { type: String, required: true }, // Topic tag, e.g., "Kinematics"
  difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard"] }, // Difficulty level
});

const QuestionBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [QuestionSchema], // Array of questions
});

const QuestionBank = mongoose.model("QuestionBank", QuestionBankSchema);

module.exports = QuestionBank;
