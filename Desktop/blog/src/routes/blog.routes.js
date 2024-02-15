import express from 'express'
import { authenticateUser } from '../middleware/auth.middleware.js'
import { createBlog , deleteBlog, updateBlog , upvoteBlog , downvoteBlog} from '../controllers/blog.controller.js'
import { createComment} from '../controllers/comment.controller.js'

const router = express.Router()

//route for adding a new Blog

router.post('/blogs' , authenticateUser , createBlog)
router.put('/blogs/:blogId', authenticateUser, updateBlog);
router.delete('/blogs/:blogId' , authenticateUser , deleteBlog)
// Route for creating a new Comment
router.post('/blogs/:blogId/comments', authenticateUser, createComment);
// Routes for upvote/downvote a blog
router.post('/blogs/:blogId/upvote', authenticateUser, upvoteBlog);
router.post('/blogs/:blogId/downvote', authenticateUser, downvoteBlog);

export default router