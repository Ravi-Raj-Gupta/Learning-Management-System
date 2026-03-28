import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhook } from "./controllers/webhooks.js"


// Intialize express
const app = express()


// connect to database
await connectDB()

// Middleware
app.use(cors())


// Routes
app.get("/", (req, res) => {
   res.send('api working')
})

app.post("/clerk", express.json(), clerkWebhook)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
