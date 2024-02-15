import  jwt  from "jsonwebtoken";

export const authenticateUser = (req , res , next) => {

    try {
        const authToken = req.headers.authorization
    
        if(!authToken){
            return res.status(401).json({
                error : "Unauthorized - Missing token"
            })
        }
        
        const decode = jwt.verify(authToken, process.env.SECRET_KEY )
        // console.log(decode.user)
        req.user = decode.user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            error : "invalid token"
        })
    }
}