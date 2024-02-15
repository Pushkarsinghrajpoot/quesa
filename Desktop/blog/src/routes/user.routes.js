import express from 'express'
import {createUser , loginUser} from '../controllers/user.controller.js'
import  {authenticateUser}  from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/users' , createUser)
router.post('/login' , loginUser)
router.get('/profile', authenticateUser, (req, res) => {
    // Access the authenticated user's information using req.user
    res.json({ user: req.user });
  });
export default router