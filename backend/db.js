const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl);
    console.log("✅ Connect to MongoDb Succesfully...");
  } catch (error) {
    console.log("❌Failed to connect to the MongoDb", error.message);
  }
};

module.exports = connectToMongoDb;
