import mongoose from "mongoose";
import logger from "./logger";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    logger.success("NextAuth Connected to MongoDB");
  } catch (error) {
    logger.error("NextAuth DB Connection Error", error);
  }
};