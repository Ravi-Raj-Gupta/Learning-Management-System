import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhook, stripeWebhooks } from "./controllers/webhooks.js"
import educatorRouter from "./routes/educatorRoutes.js"
import { clerkMiddleware } from "@clerk/express"
import { clerkClient } from "@clerk/express"
import connectCloudinary from "./configs/cloudinary.js"
import courseRouter from "./routes/courseRoutes.js"
import userRouter from "./routes/userroutes.js"
// Intialize express
const app = express()


// connect to database
await connectDB()
await connectCloudinary()


// Middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}))
app.use(clerkMiddleware())
app.use(express.json())


// Routes
app.get("/", (req, res) => {
   res.send('api working')
})

app.post("/clerk", express.json(), clerkWebhook)
app.use("/api/educator",express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post("/stripe", express.raw({ type: 'application/json' }), stripeWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
