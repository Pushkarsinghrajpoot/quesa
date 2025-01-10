const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const { registerUser, loginUser , getCurrentUser } = require('../controllers/authController');

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);



module.exports = router;
