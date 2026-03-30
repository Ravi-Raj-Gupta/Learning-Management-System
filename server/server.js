import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhook, stripeWebhooks } from "./controllers/webhooks.js"
import educatorRouter from "./routes/educatorRoutes.js"
import { clerkMiddleware } from "@clerk/express"
import connectCloudinary from "./configs/cloudinary.js"
import courseRouter from "./routes/courseRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express()

await connectDB()
await connectCloudinary()

const allowedOrigins = [
   process.env.CLIENT_URL,
   process.env.FRONTEND_URL,
   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
   "http://localhost:5173",
].filter(Boolean)

const isAllowedOrigin = (origin) => {
   if (!origin) {
      return true
   }

   if (allowedOrigins.includes(origin)) {
      return true
   }

   try {
      const { hostname } = new URL(origin)
      return hostname.endsWith(".vercel.app")
   } catch {
      return false
   }
}

app.use(cors({
   origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
         return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
   },
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

const PORT = process.env.PORT || 5000

if (process.env.VERCEL !== "1") {
   app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
   })
}

export default app
