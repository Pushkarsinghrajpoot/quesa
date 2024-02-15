import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        minlength : 5 ,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    resetPasswordToke : {
        type : String
    },
    resetPasswordExpire : {
        type : String
    }
} , {timestamps : true})

const UserModel = mongoose.model('User' , userSchema)

export default UserModel