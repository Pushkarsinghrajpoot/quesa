import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : 3 ,
        required : true
    },
    description : {
        type : String,
        minlength : 3 ,
        required : true
    },
    tag : {
        type : [String],
        default : ['General'],
        required : true
    },
    image : {
        type : String,
        default : ""
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        
    },
    username : {
        type : String
    },
    upvote : {
        type : Number,
        default : 0
    },
    downvote : {
        type : Number,
        default : 0
    },
    votedBy : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comments'
    }]
} , {timestamps : true})

const Blog =  mongoose.model('Blog' , blogSchema)

export  {Blog}
