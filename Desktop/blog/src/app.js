import express from 'express'
import userRoutes from './routes/user.routes.js'
import blogRoutes from './routes/blog.routes.js'

const app = express()

// middleware to prase JSON
app.use(express.json())

// user routes

app.use('/api' , userRoutes)
app.use('/api' , blogRoutes)

export {app}