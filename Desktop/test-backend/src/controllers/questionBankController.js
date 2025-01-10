const QuestionBank = require("../models/QuestionsBank");

// Create a new question bank
exports.createQuestionBank = async (req, res) => {
  try {
    const { title, description } = req.body;
    const questionBank = new QuestionBank({ title, description, questions: [] });
    await questionBank.save();
    res.status(201).json({ message: "Question bank created successfully", questionBank });
  } catch (error) {
    res.status(500).json({ message: "Error creating question bank", error: error.message });
  }
};

// Add questions to a specific question bank
exports.addQuestionsToBank = async (req, res) => {
  try {
    const { id } = req.params;
    const { questions } = req.body; // Array of questions with metadata

    const questionBank = await QuestionBank.findById(id);
    if (!questionBank) return res.status(404).json({ message: "Question bank not found" });

    questionBank.questions.push(...questions);
    await questionBank.save();
    res.status(200).json({ message: "Questions added successfully", questionBank });
  } catch (error) {
    res.status(500).json({ message: "Error adding questions", error: error.message });
  }
};

// Fetch questions from a question bank with filters
exports.getFilteredQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const { exam, subject, topic, difficulty } = req.query; // Filters

    const questionBank = await QuestionBank.findById(id);
    if (!questionBank) return res.status(404).json({ message: "Question bank not found" });

    let filteredQuestions = questionBank.questions;

    // Apply filters
    if (exam) filteredQuestions = filteredQuestions.filter((q) => q.exam === exam);
    if (subject) filteredQuestions = filteredQuestions.filter((q) => q.subject === subject);
    if (topic) filteredQuestions = filteredQuestions.filter((q) => q.topic === topic);
    if (difficulty) filteredQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty);

    res.status(200).json({ questions: filteredQuestions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

// Get all question banks
exports.getAllQuestionBanks = async (req, res) => {
  try {
    const questionBanks = await QuestionBank.find();
    res.status(200).json(questionBanks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching question banks", error: error.message });
  }
};
