require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI not defined");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.error("❌ DB Error:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("📦 DB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("DB error:", err);
});

module.exports = dbConnect;
