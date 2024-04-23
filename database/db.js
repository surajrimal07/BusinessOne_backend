const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to database");
  });
};

module.exports = dbConnect;
