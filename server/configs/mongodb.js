import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
   try {
      mongoose.connection.on("connected", () => {
         console.log("MongoDB connected successfully");
      });

      mongoose.connection.on("error", (err) => {
         console.error("❌ MongoDB connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
         console.log("⚠️  MongoDB disconnected");
      });

      await mongoose.connect(`${process.env.MONGODB_URI}/LMS`, {
         retryWrites: true,
         w: "majority",
         serverSelectionTimeoutMS: 10000,
      });
   } catch (error) {
      console.error("❌ ERROR connecting to MongoDB:", error.message);
      process.exit(1);
   }
};

export default connectDB;
