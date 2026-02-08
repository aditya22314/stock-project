import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please provide MONGODB_URI in the environment variables");
}

async function testConnection() {
  try {
    const start = Date.now();
    await mongoose.connect(MONGODB_URI);
    const time = Date.now() - start;
    
    console.log(`OK: Connected to MongoDB [db="${mongoose.connection.name}", host="${mongoose.connection.host}", time=${time}ms]`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

testConnection();
