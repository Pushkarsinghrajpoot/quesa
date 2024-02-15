import {Blog} from "../models/Blogs.model.js";

export const createBlog = async (req, res) => {

    try {
        // get the user information from the authenticated user (req.user)
        
        const {id: userId , username} = req.user
    
        //extract the blog details from the requested Body
        const {title , description , tag , image} = req.body
    
        //create a new Blog 
        const newBlog = await Blog.create({
            title,
            description,
            tag : tag || ['General'],
            image ,
            user : userId,
            username
        })
    
        res.status(201).json({
            message : "New Blog created",
            blog : newBlog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Internal server error in the blog section"})
    }
}

export const updateBlog = async(req , res) => {
   try {
    console.log("Authenticated user" , req.user)
     const {blogId} = req.params
     const {id : userId} = req.user
     const {title , description , tag , image} = req.body
 
     // check if a user is a creator of the blog or not
     const isUserAuthorized = await Blog.exists({_id:blogId , user: userId})
     console.log(isUserAuthorized)
     if (!isUserAuthorized) {
        return res.status(403).json({ error: 'You do not have permission to update this blog' });
    }
     //updating the blog 
     const updatedBlog = await Blog.findByIdAndUpdate(blogId , {
         $set :{
             title : title || '',
             description : description || '',
             tag : tag || [],
             image : image || ''
         }
     })
 
     if(!updateBlog){
         return res.status(404).json({error : "Blog not found"})
     }
 
     res.status(200).json({
         message : "Blog updated",
         blog : updatedBlog
     })
   } catch (error) {
    console.log(error);
    res.status(500).json({error : "Internal server error in the blog update section"})
   }  
}

export const deleteBlog = async (req , res) =>{
    try {
        const {blogId} = req.params
        const {id: userId} = req.user
    
        // check if the user is authorized to delete the blog or not
        const isUserAuthorized = await Blog.exists({_id : blogId , user: userId})
    
        if(!isUserAuthorized){
            return res.status(403).json({
                error : "User don't have permission to delete this blog"
            })
        }
    
        // Delete the blog
        const deletedBlog = Blog.findByIdAndDelete(blogId)
    
        if(!deletedBlog){
            return res.status(404).json({
                error : "Blog not found to delete"
            })
        }
        res.status(200).json({
            message : "Blog deleted successfully",
            blog : deletedBlog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error : "Internal server error in the blog deletion section"
        })
    }
}

export const upvoteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Find the blog by ID
        const blog = await Blog.findById(blogId);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Increment the upvote count
        blog.upvote += 1;

        // Save the updated blog
        await blog.save();

        res.status(200).json({ message: 'Blog upvoted successfully', blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const downvoteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Find the blog by ID
        const blog = await Blog.findById(blogId);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Decrement the downvote count
        blog.downvote -= 1;

        // Save the updated blog
        await blog.save();

        res.status(200).json({ message: 'Blog downvoted successfully', blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};