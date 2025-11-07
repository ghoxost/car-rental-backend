const mongoose = require("mongoose");

// This holds the cached connection
let cachedDb = null;

async function connectDB() {
  // If we already have a connection, reuse it
  if (cachedDb) {
    return cachedDb;
  }

  // If not, create a new connection
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    cachedDb = db;
    console.log("New MongoDB connection established.");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

module.exports = connectDB;
