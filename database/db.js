const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL_REMOTE);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = dbConnect;