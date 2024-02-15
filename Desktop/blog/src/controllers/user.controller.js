import UserModel from "../models/Users.model.js";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";

export const createUser = async (req , res) =>{

    try {
        // extract user information from the requested body
        const {username , email , password} = req.body
        // hash the password 
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await UserModel.create({username , email , password:hashedPassword})
    
        res.status(201).json({
            message : "New User created",
            user : newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'unable to create new user, something went wrong'})
    }

}

export const loginUser = async (req, res) => {
    try {
        const {username , password} = req.body
    
        // finding the user by username
    
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(401).json({
                error : "Invalid user"
            })
        }
    
        // compare the password with the hashed password store in the database
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        if(!isPasswordValid){
            return res.status(401).json({
                error : "Invalid username or password"
            })
        }
    
        // Generate JWT toke
    
        const token = Jwt.sign({user : {id : user._id , username : user.username , email : user.email}} , process.env.SECRET_KEY)
        
        res.status(200).json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error : "Internal sever error"
        })
    }

}

