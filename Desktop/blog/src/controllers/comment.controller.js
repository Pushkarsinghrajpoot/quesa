import { Blog } from "../models/Blogs.model.js";
import Comment from "../models/Comments.model.js";

export const createComment = async (req , res) =>{
    try {
        const {id : userId} = req.user
        const {blogId} = req.params
        const {message , isNested , parentCommentId} = req.body
    
        const blog = await Blog.findById(blogId)
    
        // find the blog where the comments to be write
    
        if(!blog){
            return res.status(404).json({
                message : "No Blog is here on which comment should be done"
            })
        }
        const parentComment = isNested? await Comment.findById(parentCommentId) : null
    
        const newComment = await Comment.create({
            user : userId,
            message ,
            isNested : !!isNested,
            parentComment : isNested ? parentComment._id : null,
            blog : blogId
        })
    
        if(parentComment){
            parentComment.comments.push(newComment._id)
            await parentComment.save()
        }
        blog.comments.push(newComment._id)
        await blog.save()
    
        res.status(201).json({
            message : "New comment added",
            comment : newComment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Internal server error in the comment section"})
    }
}