import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    message : {
        type : String
    },
    like : {
        type : Number
    },
    isNested : {
        type : Boolean
    },
    parentComment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    },
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blog'
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]


} , {timestamps : true})


const Comment = mongoose.model("Comment" , commentSchema)

export default Comment