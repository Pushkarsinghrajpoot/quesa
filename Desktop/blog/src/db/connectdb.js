import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n MongoDB connected !! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('Error' , error)
    }
}


export default connectDB