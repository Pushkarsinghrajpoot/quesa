const express = require("express");
const router = express.Router();
const questionBankController = require("../controllers/questionBankController");

// Create a new question bank
router.post("/", questionBankController.createQuestionBank);

// Add questions to a specific question bank
router.post("/:id/questions", questionBankController.addQuestionsToBank);

// Fetch filtered questions from a question bank
router.get("/:id/questions", questionBankController.getFilteredQuestions);

// Get all question banks
router.get("/", questionBankController.getAllQuestionBanks);

module.exports = router;
