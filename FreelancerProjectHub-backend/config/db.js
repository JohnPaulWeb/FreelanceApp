import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.warn("⚠️ App will continue running, but database features won't work until MongoDB is available");
    console.log("📝 To fix: Set up MongoDB and update MONGO_URI in .env");
    
    // Don't exit - allow app to run without DB for testing
    // Retry connection every 10 seconds
    setTimeout(connectDB, 10000);
  }
};

export default connectDB;
