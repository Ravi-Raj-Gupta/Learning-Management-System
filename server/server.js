import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhook } from "./controllers/webhooks.js"
import educatorRouter from "./routes/educatorRoutes.js"
import { clerkMiddleware } from "@clerk/express"
import { clerkClient } from "@clerk/express"

// Intialize express
const app = express()


// connect to database
await connectDB()

// Middleware
app.use(cors())
app.use(clerkMiddleware())


// Routes
app.get("/", (req, res) => {
   res.send('api working')
})

app.post("/clerk", express.json(), clerkWebhook)
app.use("/api/educator",express.json(), educatorRouter)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
