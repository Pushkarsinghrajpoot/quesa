import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    categoryName : {
        type : String
    },
    category : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blog'
    }]
} , {timestamps : true})

const Tag = mongoose.model('Tag' , tagSchema)

export default Tag