import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ohriparas2005_db_user:WnQIRPLSWSFJN6HP@cluster0.xlm98tb.mongodb.net/", {
      
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};