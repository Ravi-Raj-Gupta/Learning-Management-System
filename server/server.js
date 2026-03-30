import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhook, stripeWebhooks } from "./controllers/webhooks.js"
import educatorRouter from "./routes/educatorRoutes.js"
import { clerkMiddleware } from "@clerk/express"
import connectCloudinary from "./configs/cloudinary.js"
import courseRouter from "./routes/courseRoutes.js"
import userRouter from "./routes/userroutes.js"

const app = express()

await connectDB()
await connectCloudinary()

app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))
app.use(clerkMiddleware())

// Routes

app.get("/", (req, res) => {
   res.send('api working')
})

// ✅ Webhook routes BEFORE express.json() — need raw body
app.post("/clerk", express.raw({ type: "*/*" }), clerkWebhook)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks)

app.use(express.json())

app.use("/api/educator", educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)
app.post('/stripe', express.raw({ type: "application/json" }), stripeWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})