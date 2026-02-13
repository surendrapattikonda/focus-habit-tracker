const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "habit_tracker"
    });
    console.log(`MongoDB Connected: ${conn.connection.name}`);

  } catch (error) {
    console.error("X MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
